import React, {useEffect, useState} from "react";
import {Menu} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ExclamationCircleOutlined, FolderOutlined, InboxOutlined, PlusOutlined, UserOutlined,} from "@ant-design/icons";
import ModalForAddCategory from "./ModalForAddCategory";
import categoryService from "../services/categoryService";

const {SubMenu} = Menu;

const SideBar = () => {

    const categories = useSelector((state) => state.categories.categories);
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const createCategory = (values) => {
        categoryService.createCategory({ name: values.categoryName }, dispatch)
            .then(() => {
                categoryService.getCategories(dispatch);
            })
            .catch(() => {
                // Обработка ошибок при создании категории
            });
        setVisible(false);
    };

    useEffect(() => {
        categoryService.getCategories(dispatch);
    }, []);

    return (
        <div>
            <Menu mode="inline">
                <Menu.Item key="profile" icon={<UserOutlined/>}>
                    <Link to="/profile">Профиль</Link>
                </Menu.Item>
                <Menu.Item key="urgent" icon={<ExclamationCircleOutlined/>}>
                    <Link to="/urgent">Срочное</Link>
                </Menu.Item>
                <Menu.Item key="archive" icon={<InboxOutlined/>}>
                    <Link to="/archive">Архив</Link>
                </Menu.Item>
                <SubMenu key="categories" icon={<FolderOutlined/>} title="Категории">
                    <Menu.Item key="addCategory" icon={<PlusOutlined/>} title="Добавить" onClick={showModal}>
                        Добавить
                    </Menu.Item>
                    {categories.map((category) =>
                        <Menu.Item key={category.id} icon={<FolderOutlined/>} title={category.name}>
                            <Link to={`/categories/${category.id}`}>{category.name}</Link>
                        </Menu.Item>
                    )}
                </SubMenu>
            </Menu>
            <ModalForAddCategory visible={visible} handleCancel={handleCancel} onFinish={createCategory}/>
        </div>
    );
};

export default SideBar;