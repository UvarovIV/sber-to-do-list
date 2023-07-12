import React, {useEffect} from 'react';
import {Button, DatePicker, Form, Input, Modal, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";

const {Option} = Select;

const ModalForAddTask = ({visible, closeAddTaskModal}) => {

    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const onFinish = (values) => {
        const title = values.taskName;
        const description = values.taskDescription;
        const date = values.taskDate;
        const regularity = values.taskRegularity
        const status = values.taskStatus
        const priority = values.taskPriority
        console.log(regularity)
        console.log(status)
        console.log(priority)
        taskService.createTask(selectedCategory.id, {
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
    }, []);

    const statuses = useSelector((state) => state.tasks.statuses);
    const regularities = useSelector((state) => state.tasks.regularities);
    const priorities = useSelector((state) => state.tasks.priorities);

    const onChange = (value, dateString) => {

    };
    const onOk = (value) => {

    };

    return (
        <Modal open={visible} onCancel={closeAddTaskModal} footer={null}>

                <div>
                    <Form onFinish={onFinish} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                        <Form.Item
                            label="Название"
                            name="taskName"
                            rules={[{required: true, message: 'Введите название'}]}
                        >
                            <Input placeholder="Введите название"/>
                        </Form.Item>
                        <Form.Item
                            label="Описание"
                            name="taskDescription"
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
                            initialValue={1}
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
                            initialValue={1}
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
                            initialvalues={1}
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

        </Modal>
    );
};

export default ModalForAddTask