import React, { useEffect, useState } from 'react';
import {Card, Modal, Form, Input, DatePicker, Select, Button} from 'antd';
import { useParams } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
import { useDispatch } from "react-redux";
import taskService from "../services/taskService";
import categoryService from "../services/categoryService";

const { Option } = Select;

const CategoryPage = () => {
    const { id } = useParams();

    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        taskService.getTasksFromCategory(id, dispatch).then((data) => {
            setTasks(data);
            console.log(data);
        });
    }, [tasks]);

    const openModal = (task) => {
        setSelectedTask(task);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setSelectedTask(null);
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log(values);
    };

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const handleDeleteCategory = () => {
        categoryService.deleteCategory(id, dispatch)
    };

    return (
        <Scrollbar>
            <div style={{ paddingBottom: 10, padding: 30 }}>
                {/*<Button type="danger" onClick={handleDeleteCategory}>*/}
                {/*    Удалить категорию*/}
                {/*</Button>*/}
                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        style={{ marginBottom: 10 }}
                        onClick={() => openModal(task)} // Добавьте обработчик клика для открытия модального окна
                    >
                        {task.title}
                        <br />
                        {task.dateAndTimeOfTask}
                    </Card>
                ))}
            </div>

            <Modal
                open={isModalVisible}
                onCancel={closeModal} // Добавьте обработчик для закрытия модального окна
                footer={null}
            >
                {selectedTask && (
                    <div>
                        <h3>{selectedTask.title}</h3>
                        <p>{selectedTask.description}</p>

                        <Form
                            onFinish={onFinish}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Form.Item
                                label="Название"
                                name="taskName"
                                initialValue={selectedTask.title}
                                rules={[{ required: true, message: 'Введите название' }]}
                            >
                                <Input placeholder="Введите название" />
                            </Form.Item>

                            <Form.Item
                                label="Описание"
                                name="taskDescription"
                                initialValue={selectedTask.description}
                            >
                                <Input.TextArea rows={4} placeholder="Введите описание" />
                            </Form.Item>

                            <Form.Item
                                label="Дата"
                                name="taskDate"
                            >
                                <DatePicker showTime onChange={onChange} onOk={onOk} />
                            </Form.Item>

                            <Form.Item
                                label="Статус"
                                name="taskStatus"
                                initialValue={selectedTask.status}
                            ><Select>
                                <Option value="completed">Выполнено</Option>
                                <Option value="in-progress">В процессе</Option>
                                <Option value="new">Новая</Option>
                            </Select>
                            </Form.Item>

                            <Form.Item
                                label="Приоритет"
                                name="taskPriority"
                                initialValue={selectedTask.priority}
                            >
                                <Select>
                                    <Option value="1">Очень низкий</Option>
                                    <Option value="2">Низкий</Option>
                                    <Option value="3">Средний</Option>
                                    <Option value="4">Высокий</Option>
                                    <Option value="5">Очень высокий</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </Modal>
        </Scrollbar>
    );
};

export default CategoryPage;