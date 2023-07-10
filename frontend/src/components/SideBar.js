import { Menu } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import categoryService from "../services/categoryService";
import ModalForAddCategory from "./ModalForAddCategory";

const { SubMenu } = Menu;
const { Item } = Menu;

const SideBar = () => {
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const createCategory = (values) => {
        categoryService.createCategory({ name: values.categoryName }, dispatch);
        setVisible(false);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        categoryService.getCategories(dispatch).then((data) => {
            setCategories(data);
        });
    }, [categories]);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const items = isLoggedIn
        ? [
            {
                key: "profile",
                icon: <PieChartOutlined />,
                children: null,
                label: "Профиль",
                type: "link",
            },
            {
                key: "2",
                icon: <DesktopOutlined />,
                children: null,
                label: "Срочное",
                type: "link",
            },
            {
                key: "3",
                icon: <ContainerOutlined />,
                children: null,
                label: "Архив",
                type: "link",
            },
            {
                key: "sub1",
                icon: <MailOutlined />,
                children: [
                    {
                        key: "addCategory",
                        icon: <PlusOutlined />,
                        children: null,
                        label: "Добавить",
                        type: "modal",
                    },
                    ...categories.map((category) => ({
                        key: "category/" + category.id,
                        icon: null,
                        children: null,
                        label: category.name,
                        type: "link",
                    })),
                ],
                label: "Категории",
            },
        ]
        : [
            {
                key: "profile",
                icon: <PieChartOutlined />,
                children: null,
                label: "Профиль",
                type: "link",
            },
        ];

    const renderMenuItem = (item) => {
        if (item.type === "link") {
            return (
                <Item key={item.key} icon={item.icon} title={item.label}>
                    <Link to={`/${item.key}`}>{item.label}</Link>
                </Item>
            );
        }
        if (item.type === "modal") {
            return (
                <Item key={item.key} icon={item.icon} title={item.label} onClick={showModal}>
                    {item.label}
                </Item>
            );
        } else {
            return (
                <SubMenu key={item.key} icon={item.icon} title={item.label}>
                    {item.children.map((child) => renderMenuItem(child))}
                </SubMenu>
            );
        }
    };

    return (
        <div>
            <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline">{items.map((item) => renderMenuItem(item))}
            </Menu>
            <ModalForAddCategory visible={visible} handleCancel={handleCancel} onFinish={createCategory} />
        </div>
    );
};

export default SideBar;