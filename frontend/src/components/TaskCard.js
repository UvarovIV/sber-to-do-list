import React, {useState} from 'react';
import {Card, Dropdown, Menu} from 'antd';
import {DownOutlined, EllipsisOutlined, UpOutlined} from '@ant-design/icons';
import Translator from "../utils/Translator";
import taskService from "../services/taskService";
import {useDispatch} from "react-redux";

const TaskCard = ({task, openModal}) => {

    const dispatch = useDispatch();
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    const handleDelete = () => {
        taskService.deleteTask(task, dispatch);
    };

    const handleEdit = () => {
        openModal(task);
    };

    const handleCardClick = () => {
        setIsCardExpanded(!isCardExpanded);
    };

    const menu = (
        <Menu>
            <Menu.Item key="delete" onClick={handleDelete}>
                Удалить
            </Menu.Item>
            <Menu.Item key="edit" onClick={handleEdit}>
                Изменить
            </Menu.Item>
        </Menu>
    );

    return (
        <Card
            style={{
                marginBottom: 10,
                position: 'relative',
                minHeight: isCardExpanded ? 'auto' : 150,
                maxHeight: 300,
                overflow: 'auto',
            }}
        >
            <div style={{wordWrap: 'break-word'}}>
                <div style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10,
                    wordWrap: 'break-word'
                }}>{task.title}<br/></div>
                {task.description === "" ? <></> : <div>{task.description}<br/></div>}
                {isCardExpanded && (
                    <>
                        {task.date === null ? <></> : <div> Сделать до: {task.date}<br/></div>}
                        {task.regularity.name === 'NOT_REGULAR' ? <></> :
                            <div>Повторять: {Translator.translateRegularity(task.regularity.name)}<br/></div>}
                        {"Статус : " + Translator.translateStatus(task.status.name)}<br/>
                        {"Приоритет : " + Translator.translatePriority(task.priority.name)}<br/>
                    </>
                )}{!isCardExpanded && (
                <Dropdown overlay={menu} placement="bottomRight">
                    <EllipsisOutlined style={{position: 'absolute', top: 10, right: 20, fontSize: 20}}/>
                </Dropdown>

            )}

                <div style={{position: 'absolute', bottom: 10, right: 22}}>
                    {isCardExpanded ? (
                        <UpOutlined onClick={handleCardClick} style={{fontSize: 12, cursor: 'pointer'}}/>
                    ) : (
                        <DownOutlined onClick={handleCardClick} style={{fontSize: 12, cursor: 'pointer'}}/>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;