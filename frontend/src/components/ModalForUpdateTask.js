import React, {useEffect} from 'react';
import {Button, DatePicker, Form, Input, Modal, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";
import Translator from "../utils/Translator";

const {Option} = Select;

const ModalForUpdateTask = ({selectedTask, closeModal}) => {

    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const onFinish = (values) => {
        const task_id = selectedTask.id;
        const title = values.taskName;
        const description = values.taskDescription;
        const date = values.taskDate ? values.taskDate?.format("YYYY-MM-DD HH:mm:ss") : selectedTask.date;
        const regularity = values.taskRegularity ? values.taskRegularity : selectedTask.regularity.id
        const status = values.taskStatus ? values.taskStatus : selectedTask.status.id
        const priority = values.taskPriority ? values.taskPriority : selectedTask.priority.id
        taskService.updateTask(selectedCategory.id, {
            id: task_id,
            date: date,
            description: description,
            title: title,
            category: {
                id: selectedTask.categoryId
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
        dispatch(closeModal)
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

    return (
        <Modal open={!!selectedTask} onCancel={closeModal} footer={null}>
            {selectedTask && (
                <div>
                    <div style={{textAlign: "center", fontSize: 26, marginBottom: 16}}>Изменение задачи</div>
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
                            <DatePicker placeholder={selectedTask.date} showTime/>
                        </Form.Item>

                        <Form.Item
                            label="Повтор"
                            name="taskRegularity"
                        >

                            <Select placeholder={Translator.translateRegularity(selectedTask.regularity.name)}>
                                {regularities.map((regularity) => (
                                    <Option key={regularity.id} value={String(regularity.id)}>{Translator.translateRegularity(regularity.name)}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Статус"
                            name="taskStatus"
                        >
                            <Select placeholder={Translator.translateStatus(selectedTask.status.name)}>
                                {statuses.map((status) => (
                                    <Option key={status.id} value={String(status.id)}>{Translator.translateStatus(status.name)}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Приоритет"
                            name="taskPriority"

                        >
                            <Select placeholder={Translator.translatePriority(selectedTask.priority.name)}>
                                {priorities.map((priority) => (
                                    <Option key={priority.id} value={String(priority.id)}>{Translator.translatePriority(priority.name)}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 10, span: 16}}>
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