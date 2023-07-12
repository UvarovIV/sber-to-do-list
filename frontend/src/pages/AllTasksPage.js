import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Scrollbar } from "react-scrollbars-custom";
import ModalForUpdateTask from "../components/ModalForUpdateTask";
import { useDispatch, useSelector } from "react-redux";
import taskService from "../services/taskService";
import Translator from "../components/Translator";
import sortTasks from "../components/SortUtils";
import SortButtons from "../components/SortButtons";

const AllTasksPage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const dispatch = useDispatch();

    const selectedTask = useSelector((state) => state.tasks.selectedTask);
    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        taskService.getAllTasks(dispatch);
    }, []);

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

    return (
        <Scrollbar>
            <div style={{ paddingBottom: 10, paddingTop: 20, paddingRight: 30, paddingLeft: 30 }}>
                <div style={{ marginBottom: 10, fontSize: 30 }}>
                    Все задачи
                </div>

                <SortButtons handleSort={handleSort} />

                {sortedTasks.map((task) => (
                    <Card
                        key={task.id}
                        style={{ marginBottom: 10 }}
                    >
                        {task.title}<br />
                        {task.date === null ? <></> : <div> Сделать до: {task.date}<br /></div>}
                        {task.regularity.name === 'NOT_REGULAR' ? <></> : <div>Повторять: {Translator.translateRegularity(task.regularity.name)}<br /></div>}
                        {"Статус : " + Translator.translateStatus(task.status.name)}<br />
                        {"Приоритет : " + Translator.translatePriority(task.priority.name)}<br />
                    </Card>
                ))}
            </div>
        </Scrollbar>
    );

};

export default AllTasksPage;