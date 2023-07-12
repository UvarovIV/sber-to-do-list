import React, {useEffect, useState} from 'react';
import {Button, Card, Dropdown, Menu} from "antd";
import {Scrollbar} from "react-scrollbars-custom";
import categoryService from "../services/categoryService";
import ModalForUpdateTask from "../components/ModalForUpdateTask";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";
import {DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import ModalDeleteCategory from "../components/ModalForDeleteCategory";
import ModalForAddTask from "../components/ModalForAddTask";

const CategoryPage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedTask = useSelector((state) => state.tasks.selectedTask);
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        taskService.getTasksFromCategory(selectedCategory.id, dispatch);
    }, [selectedCategory]);

    const openModal = (task) => {
        taskService.selectTask(task, dispatch)
        setIsModalVisible(true);
    };

    const closeModal = () => {
        taskService.selectTask(null, dispatch)
        setIsModalVisible(false);
    };

    const closeAddTaskModal = () => {
        setShowAddTaskModal(false)
    }

    const handleDeleteCategory = () => {
        categoryService.deleteCategory(selectedCategory.id, dispatch);
        setShowDeleteModal(true);
        navigate("/profile")
        categoryService.getCategories(dispatch);
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleShowAddTaskModal = () => {
        setShowAddTaskModal(true);
    }

    const handleCancelDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleMenuClick = (e) => {
        switch (e.key) {
            case "addTask":
                handleShowAddTaskModal()
                break;
            case "editCategory":

                break;
            case "deleteCategory":
                handleShowDeleteModal()
                break;
            default:
                break;
        }
    };

    const items = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="addTask" icon={<PlusOutlined/>}>
                Добавить задачу
            </Menu.Item>
            <Menu.Item key="editCategory" icon={<EditOutlined/>}>
                Изменить категорию
            </Menu.Item>
            <Menu.Item key="deleteCategory" icon={<DeleteOutlined/>}>
                Удалить категорию
            </Menu.Item>
        </Menu>
    );

    return (
        <Scrollbar>
            <div style={{position: "absolute", top: 20, right: 30}}>
                <Dropdown overlay={items} trigger={["click"]}>
                    <Button shape="circle" icon={<EllipsisOutlined/>} size="large"/>
                </Dropdown>
            </div>
            <div style={{paddingBottom: 10, paddingTop: 20, paddingRight: 30, paddingLeft: 30}}>
                <div style={{marginBottom: 10, fontSize: 30}}>
                    {selectedCategory && selectedCategory.name ? selectedCategory.name : <>Имя не определено</>}
                </div>

                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        style={{marginBottom: 10}}
                        onClick={() => openModal(task)}
                    >
                        {task.title}
                        <br/>
                        {task.date}
                    </Card>
                ))}
            </div>
            {selectedTask &&
                <ModalForUpdateTask
                    selectedTask={selectedTask}
                    closeModal={closeModal}
                />}

            <ModalForAddTask
                visible={showAddTaskModal}
                closeAddTaskModal={closeAddTaskModal}
            />
            <ModalDeleteCategory
                visible={showDeleteModal}
                onCancel={handleCancelDeleteModal}
                onDelete={handleDeleteCategory}
            />
        </Scrollbar>
    );
};

export default CategoryPage;