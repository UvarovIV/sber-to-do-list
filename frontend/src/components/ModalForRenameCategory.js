import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const ModalForRenameCategory = ({ visible, onCancel, onSubmit }) => {
    const [newName, setNewName] = useState('');

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(newName);
        setNewName('');
    };

    return (
        <Modal
            visible={visible}
            title="Изменить имя категории"
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>
            ]}
        >
            <Input value={newName} onChange={handleNameChange} placeholder="Введите новое имя категории" />
        </Modal>
    );
};

export default ModalForRenameCategory;