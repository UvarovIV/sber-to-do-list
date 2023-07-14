import React from "react";
import { Modal, Form, Input, Button } from "antd";

const ModalForAddCategory = ({ visible, handleCancel, onFinish }) => {
    return (
        <Modal open={visible} onCancel={handleCancel} footer={null}>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item label="Название категории" name="categoryName">
                    <Input placeholder="Введите название" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalForAddCategory;