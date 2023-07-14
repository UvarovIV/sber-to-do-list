import React, { useEffect, useState } from 'react';
import { Scrollbar } from "react-scrollbars-custom";
import ModalForUpdateTask from "../components/ModalForUpdateTask";
import { useDispatch, useSelector } from "react-redux";
import taskService from "../services/taskService";
import sortTasks from "../utils/SortUtils";
import filterTasks from "../utils/FilterUtils";
import SortButtons from "../components/SortButtons";
import TaskCard from "../components/TaskCard";
import FilterSection from "../components/FilterSection";

const AllTasksPage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchValue, setSearchValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const dispatch = useDispatch();

    const selectedTask = useSelector((state) => state.tasks.selectedTask);
    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        taskService.getAllTasks(dispatch);
    }, [selectedTask]);

    const openModal = (task) => {
        taskService.selectTask(task, dispatch)
        setIsModalVisible(true);
    };

    const closeModal = () => {
        taskService.selectTask(null, dispatch)
        setIsModalVisible(false);
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

    return (
        <Scrollbar>
            <div style={{ paddingBottom: 10, paddingTop: 20, paddingRight: 30, paddingLeft: 30 }}>
                <div style={{ marginBottom: 10, fontSize: 30 }}>
                    Все задачи
                </div>

                <SortButtons handleSort={handleSort} />

                <FilterSection
                    handleSearch={handleSearch}
                    handleDateChange={handleDateChange}
                    handleStatusChange={handleStatusChange}/>

                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} openModal={openModal} />
                ))}
            </div>
            {selectedTask &&
                <ModalForUpdateTask
                    selectedTask={selectedTask}
                    closeModal={closeModal}
                />}
        </Scrollbar>
    );

};

export default AllTasksPage;