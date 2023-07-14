import React, {useEffect, useState} from 'react';
import taskService from "../services/taskService";
import {useDispatch, useSelector} from "react-redux";
import TaskCard from "../components/TaskCard";
import ModalForUpdateTask from "../components/ModalForUpdateTask";
import {Scrollbar} from "react-scrollbars-custom";


const ArchivePage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();

    const selectedCategory = useSelector((state) => state.categories.selectedCategory);
    const tasks = useSelector((state) => state.tasks.tasks);
    const selectedTask = useSelector((state) => state.tasks.selectedTask);

    const openModal = (task) => {
        taskService.selectTask(task, dispatch)
        setIsModalVisible(true);
    };

    const closeModal = () => {
        taskService.selectTask(null, dispatch)
        setIsModalVisible(false);
    };

    useEffect(() => {
        taskService.getTasksFromArchive(dispatch);
    }, [selectedCategory]);

    return (
        <Scrollbar>
            <div style={{paddingBottom: 10, paddingTop: 20, paddingRight: 30, paddingLeft: 30}}>
                <div style={{marginBottom: 10, fontSize: 30}}>
                    {selectedCategory && selectedCategory.name ? selectedCategory.name : <>Имя не определено</>}
                </div>

                {tasks.map((task) => (
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

export default ArchivePage;