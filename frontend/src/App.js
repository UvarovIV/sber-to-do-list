import React, {useState} from 'react';
import {Button, Form, Input, Layout, Modal} from 'antd';
import authService from "./services/authService";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./slices/authSlice";
import {Scrollbar} from 'react-scrollbars-custom';
import SideBar from "./components/SideBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import {NotFoundPage} from "./pages/NotFoundPage";

const {Header, Content, Sider} = Layout;

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    const showModal = () => {
        if (isLoggedIn) {
            dispatch(logout(user))
            authService.logout()
            navigate("/profile")
        } else {
            setIsModalVisible(true);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {

        if (isRegisterForm) {
            const registerData = {
                username: values.username,
                email: values.email,
                password: values.password
            }
            authService.register(registerData)
            form.resetFields();
        } else {
            authService.login(values)
            form.resetFields();
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
                            <Route path="/category/:id" element={<CategoryPage/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </Content>
                </Layout>

                <Modal
                    title={isRegisterForm ? 'Регистрация' : 'Вход'}
                    open={isModalVisible}
                    footer={null}

                    onCancel={handleCancel}
                >
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item
                            name="username"
                            label="Логин"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите свой email!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        {isRegisterForm && (
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, введите свой email!',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        )}
                        <Form.Item
                            name="password"
                            label="Пароль"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите свой пароль!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        {isRegisterForm && (
                            <Form.Item
                                name="confirmPassword"
                                label="Подтвердите пароль"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, подтвердите свой пароль!',
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Пароли не совпадают!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>
                        )}
                        <Form.Item>
                            <Button type="link" onClick={handleSwitchForm}>
                                {isRegisterForm ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                            <Button style={{marginLeft: 240}} type="primary" htmlType="submit">
                                {isRegisterForm ? 'Зарегистрироваться' : 'Войти'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Layout>
        </Layout>
    );
};



export default App;