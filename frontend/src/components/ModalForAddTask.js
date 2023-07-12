import React, {useEffect} from 'react';
import {Button, DatePicker, Form, Input, Modal, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";
import Translator from "./Translator";

const {Option} = Select;

const ModalForAddTask = ({visible, closeAddTaskModal}) => {

    const [form] = Form.useForm();

    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    const onFinish = (values) => {
        const title = values.taskName;
        const description = values.taskDescription ? values.taskDescription : "";
        const date = values.taskDate ? values.taskDate?.format("YYYY-MM-DD HH:mm:ss") : null;
        const regularity = values.taskRegularity ? values.taskRegularity : 1
        const status = values.taskStatus ? values.taskStatus : 1
        const priority = values.taskPriority ? values.taskPriority : 1
        taskService.createTask(selectedCategory.id, {
            date: date,
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
        form.resetFields();
        closeAddTaskModal();
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
        <Modal open={visible} onCancel={() => {closeAddTaskModal(); form.resetFields()}} footer={null}>

                <div>
                    <Form form={form} onFinish={onFinish} labelCol={{span: 6}} wrapperCol={{span: 16}}>
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
                            <DatePicker placeholder={"Выберите дату"} showTime onChange={onChange} onOk={onOk}/>
                        </Form.Item>

                        <Form.Item
                            label="Повтор"
                            name="taskRegularity"
                        >

                            <Select placeholder={"Выберите регулярность повторения"}>
                                {regularities.map((regularity) => (
                                    <Option key={regularity.id} value={String(regularity.id)}>{Translator.translateRegularity(regularity.name)}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Статус"
                            name="taskStatus"
                        >
                            <Select placeholder={"Выберите статус задачи"}>
                                {statuses.map((status) => (
                                    <Option key={status.id} value={String(status.id)}>{Translator.translateStatus(status.name)}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Приоритет"
                            name="taskPriority"
                            initialvalues={1}
                        >
                            <Select placeholder={"Выберите приоритет задачи"}>
                                {priorities.map((priority) => (
                                    <Option key={priority.id} value={String(priority.id)}>{Translator.translatePriority(priority.name)}</Option>
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