import {Menu} from "antd";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FolderOutlined, InboxOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import categoryService from "../services/categoryService";
import ModalForAddCategory from "./ModalForAddCategory";

const {SubMenu} = Menu;

const SideBar = () => {

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const categories = useSelector((state) => state.categories.categories);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const setCategory = (id) => {
        categoryService.selectCategory(id, dispatch)
    }

    const createCategory = (values) => {
        categoryService.createCategory({name: values.categoryName}, dispatch)
        setVisible(false);
    };

    useEffect(() => {
        categoryService.getCategories(dispatch)
    }, []);

    return (
        <div>
            <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline">
                <Menu.Item key="profile" icon={<UserOutlined/>}>
                    <Link to="/profile">Профиль</Link>
                </Menu.Item>
                {isLoggedIn ?
                    (<>
                        <Menu.Item key="tasks" icon={<InboxOutlined/>} onClick={() => setCategory({id: -1, name: "Задачи"})}>
                            <Link to="/tasks">Все задачи</Link>
                        </Menu.Item>
                        <Menu.Item key="archive" icon={<InboxOutlined/>} onClick={() => setCategory({id: -2, name: "Архив"})}>
                            <Link to="/archive">Архив</Link>
                        </Menu.Item>
                        <SubMenu key="categories" icon={<FolderOutlined/>} title="Категории">
                            <Menu.Item key="addCategory" icon={<PlusOutlined/>} title="Добавить" onClick={showModal}>
                                Добавить
                            </Menu.Item>
                            {categories.map((category) => (
                                <Menu.Item key={`category/${category.id}`} icon={<FolderOutlined/>}
                                           title={category.name} onClick={() => setCategory({id: category.id, name: category.name})}>
                                    <Link to={`/category`}>{category.name}</Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    </>) : (<></>)}
            </Menu>
            <ModalForAddCategory visible={visible} handleCancel={handleCancel} onFinish={createCategory}/>
        </div>
    );
};

export default SideBar;