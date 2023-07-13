import React, {useEffect, useState} from 'react';
import {Button, Form, Layout, message} from 'antd';
import authService from "./services/authService";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "./slices/authSlice";
import {Scrollbar} from 'react-scrollbars-custom';
import SideBar from "./components/SideBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import {NotFoundPage} from "./pages/NotFoundPage";
import ArchivePage from "./pages/ArchivePage";
import EasterEggPage from "./pages/EasterEggPage";
import categoryService from "./services/categoryService";
import ModalForAuthorization from "./components/ModalForAuthorization";
import AllTasksPage from "./pages/AllTasksPage";

const {Header, Content, Sider} = Layout;

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    const showModal = () => {
        if (isLoggedIn) {
            dispatch(logout(user));
            authService.logout();
            navigate("/profile");
        } else {
            setIsModalVisible(true);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        categoryService.getCategories(dispatch);
    }, [user]);

    const onFinish = (values) => {
        if (isRegisterForm) {
            const registerData = {
                username: values.username,
                email: values.email,
                password: values.password
            };
            authService.register(registerData);
            form.resetFields();
        } else {
            authService.login(values).then((user) => {
                console.log(user)
                dispatch(login(user))
                navigate("/profile")
            }, (error) => {
                const _content = (error.response && error.response.data)
                error.message ||
                error.toString();
                console.log(_content);
                message.error("Неправильный логин или пароль");
            })
        }

        setIsModalVisible(false);
    };

    const handleSwitchForm = () => {
        form.resetFields();
        setIsRegisterForm(!isRegisterForm);
    };

    return (
        <Layout>
            <Header style={{
                fontSize: 20,
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                TO DO List
                <Button style={{marginLeft: 10}} type="primary" onClick={showModal}>
                    {isLoggedIn ? 'Выйти' : 'Вход'}
                </Button>
            </Header>
            <Layout style={{minHeight: '93vh'}}>
                <Sider theme="light">
                    <Scrollbar>
                        <SideBar/>
                    </Scrollbar>
                </Sider>

                <Layout>
                    <Content>
                        <Routes>
                            <Route path="/profile" element={<ProfilePage/>}/>
                            <Route path="/tasks" element={<AllTasksPage/>}/>
                            <Route path="/archive" element={<ArchivePage/>}/>
                            <Route path="/category" element={<CategoryPage/>}/>
                            <Route path="/easteregg" element={<EasterEggPage/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </Content>
                </Layout>

                <ModalForAuthorization
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    onFinish={onFinish}
                    handleSwitchForm={handleSwitchForm}
                    form={form}
                    isRegisterForm={isRegisterForm}
                />
            </Layout>
        </Layout>
    );
};

export default App;