import {Button, Form, Input, Modal} from "antd";
import React from "react";

const ModalForAuthorization = ({isModalVisible, handleCancel, onFinish, handleSwitchForm, form, isRegisterForm}) => {
    return (
        <Modal
            title={isRegisterForm ? 'Регистрация' : 'Вход'}
            open={isModalVisible}
            footer={null}

            onCancel={handleCancel}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="username"
                    label="Логин"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свой email!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                {isRegisterForm && (
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите свой email!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                )}
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите свой пароль!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                {isRegisterForm && (
                    <Form.Item
                        name="confirmPassword"
                        label="Подтвердите пароль"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, подтвердите свой пароль!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                )}
                <Form.Item>
                    <Button type="link" onClick={handleSwitchForm}>
                        {isRegisterForm ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Button style={{marginLeft: 240}} type="primary" htmlType="submit">
                        {isRegisterForm ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalForAuthorization