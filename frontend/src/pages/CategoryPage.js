import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Menu} from "antd";
import {Scrollbar} from "react-scrollbars-custom";
import categoryService from "../services/categoryService";
import ModalForUpdateTask from "../components/ModalForUpdateTask";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";
import {DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import ModalDeleteCategory from "../components/ModalForDeleteCategory";
import ModalForAddTask from "../components/ModalForAddTask";
import SortButtons from "../components/SortButtons";
import sortTasks from "../utils/SortUtils";
import TaskCard from "../components/TaskCard";
import filterTasks from "../utils/FilterUtils";
import FilterSection from "../components/FilterSection";
import ModalForRenameCategory from "../components/ModalForRenameCategory";

const CategoryPage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchValue, setSearchValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectedTask = useSelector((state) => state.tasks.selectedTask);
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const tasks = useSelector((state) => state.tasks.tasks);



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

    const handleRenameCategory = (newName) => {
        categoryService.updateCategory({id: selectedCategory.id, name: newName}, dispatch);
        setShowRenameModal(false);
    };

    const handleDeleteCategory = () => {
        categoryService.deleteCategory(selectedCategory.id, dispatch);
        setShowDeleteModal(true);
        navigate("/tasks")
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

    const handleShowRenameModal = () => {
        setShowRenameModal(true);
    };

    const handleCancelRenameModal = () => {
        setShowRenameModal(false);
    };

    const handleMenuClick = (e) => {
        switch (e.key) {
            case "addTask":
                handleShowAddTaskModal()
                break;
            case "editCategory":
                handleShowRenameModal();
                break;
            case "deleteCategory":
                handleShowDeleteModal()
                break;
            default:
                break;
        }
    };

    const sortedTasks = sortTasks(tasks, sortBy, sortDirection)

    const handleSort = (newSortBy) => {
        if (newSortBy === sortBy) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortDirection('asc');
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

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filteredTasks = filterTasks(sortedTasks, searchValue, selectedDate, selectedStatus);

    useEffect(() => {
        taskService.getTasksFromCategory(selectedCategory.id, dispatch);
        setSearchValue("")
        setSelectedDate(null)
        setSelectedStatus(null)
    }, [selectedCategory]);

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
                <SortButtons handleSort={handleSort} />

                <FilterSection
                    handleSearch={handleSearch}
                    handleDateChange={handleDateChange}
                    handleStatusChange={handleStatusChange}/>
                <h2 style={{marginBottom: 10, marginTop: 10}}>Невыполненные задачи</h2>
                {filteredTasks.filter(task => task.status.name !== "COMPLETED").length === 0 && <div>Задач ещё нет</div>}
                {filteredTasks.filter(task => task.status.name !== "COMPLETED").map((task) => (
                    <TaskCard key={task.id} task={task} openModal={openModal} />
                ))}
                <h2 style={{marginBottom: 10, marginTop: 10}}>Выполненные задачи</h2>
                {filteredTasks.filter(task => task.status.name === "COMPLETED").length === 0 && <div>Задач ещё нет</div>}
                {filteredTasks.filter(task => task.status.name === "COMPLETED").map((task) => (
                    <TaskCard key={task.id} task={task} openModal={openModal} />
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
            <ModalForRenameCategory
                visible={showRenameModal}
                onCancel={handleCancelRenameModal}
                onSubmit={handleRenameCategory}
            />
        </Scrollbar>
    );
};

export default CategoryPage;