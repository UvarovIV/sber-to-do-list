import React, {useEffect} from 'react';
import {Button, DatePicker, Form, Input, Modal, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";

const {Option} = Select;

const ModalForUpdateTask = ({selectedTask, closeModal}) => {

    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const onFinish = (values) => {
        const task_id = selectedTask.id;
        const title = values.taskName;
        const description = values.taskDescription;
        const date = values.taskDate;
        const regularity = values.taskRegularity
        const status = values.taskStatus
        const priority = values.taskPriority
        taskService.updateTask(selectedCategory.id, {
            id: task_id,
            date_and_time_of_task: date,
            description: description,
            title: title,
            category: {
                id: selectedCategory.id
            },
            regularity: {
                id: regularity
            },
            priority: {
                id: priority
            },
            status: {
                id: status
            },
        }, dispatch)
    };

    const dispatch = useDispatch();

    useEffect(() => {
        taskService.getStatuses(dispatch)
        taskService.getPriorities(dispatch)
        taskService.getRegularities(dispatch)
    }, [selectedTask]);

    const statuses = useSelector((state) => state.tasks.statuses);
    const regularities = useSelector((state) => state.tasks.regularities);
    const priorities = useSelector((state) => state.tasks.priorities);

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    return (
        <Modal open={!!selectedTask} onCancel={closeModal} footer={null}>
            {selectedTask && (
                <div>
                    <h3>{selectedTask.title}</h3>
                    <p>{selectedTask.description}</p>
                    <Form onFinish={onFinish} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                        <Form.Item
                            label="Название"
                            name="taskName"
                            initialValue={selectedTask.title}
                            rules={[{required: true, message: 'Введите название'}]}
                        >
                            <Input placeholder="Введите название"/>
                        </Form.Item>
                        <Form.Item
                            label="Описание"
                            name="taskDescription"
                            initialValue={selectedTask.description}
                        >
                            <Input.TextArea rows={4} placeholder="Введите описание"/>
                        </Form.Item>

                        <Form.Item
                            label="Дата"
                            name="taskDate"
                        >
                            <DatePicker showTime onChange={onChange} onOk={onOk}/>
                        </Form.Item>

                        <Form.Item
                            label="Повтор"
                            name="taskRegularity"
                        >

                            <Select>
                                {regularities.map((regularity) => (
                                    <Option key={regularity.id} value={String(regularity.id)}>{regularity.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Статус"
                            name="taskStatus"
                        >
                            <Select>
                                {statuses.map((status) => (
                                    <Option key={status.id} value={String(status.id)}>{status.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Приоритет"
                            name="taskPriority"

                        >
                            <Select>
                                {priorities.map((priority) => (
                                    <Option key={priority.id} value={String(priority.id)}>{priority.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 6, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </Modal>
    );
};

export default ModalForUpdateTask