import React from 'react';
import { Button } from 'antd';

const SortButtons = ({ handleSort }) => {
    return (
        <div style={{ marginBottom: 10, marginRight: 10 }}>
            <Button style={{ marginRight: 10 }} onClick={() => handleSort('status')}>
                Сортировать по статусу
            </Button>
            <Button style={{ marginRight: 10 }} onClick={() => handleSort('priority')}>
                Сортировать по приоритету
            </Button>
            <Button style={{ marginRight: 10 }} onClick={() => handleSort('regularity')}>
                Сортировать по регулярности
            </Button>
            <Button style={{ marginRight: 10 }} onClick={() => handleSort('date')}>
                Сортировать по дате
            </Button>
        </div>
    );
};

export default SortButtons;