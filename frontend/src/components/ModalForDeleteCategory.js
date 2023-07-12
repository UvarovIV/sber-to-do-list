import { useState } from "react";
import { Button, Modal } from "antd";

const ModalDeleteCategory = ({ visible, onCancel, onDelete }) => {
    return (
        <Modal
            open={visible}
            title="Удаление категории"
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Отмена
                </Button>,
                <Button key="delete" type="primary" onClick={onDelete}>
                    Удалить
                </Button>,
            ]}
        >
            <p>Вы действительно хотите удалить категорию?</p>
        </Modal>
    );
};

export default ModalDeleteCategory;