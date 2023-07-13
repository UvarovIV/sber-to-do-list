import React from 'react';
import { DatePicker, Select } from 'antd';
import Translator from "../utils/Translator";
import Search from "antd/es/input/Search";
import {useSelector} from "react-redux";

const { Option } = Select;

const FilterSection = ({
                           handleSearch,
                           handleDateChange,
                           handleStatusChange,
                       }) => {

    const statuses = useSelector((state) => state.tasks.statuses);

    return (
        <div style={{ marginBottom: 10 }}>
            <Search placeholder="Поиск по названию" onSearch={handleSearch} style={{ width: 200, marginRight: 10 }} />
            <DatePicker placeholder="Поиск по дате" onChange={handleDateChange} style={{ marginRight: 10 }} />
            <Select placeholder="Фильтр по статусу" onChange={handleStatusChange} style={{ width: 200, marginRight: 10 }}>
                <Option value={null}>Все</Option>
                {statuses.map((status) => (
                    <Option key={status.id} value={String(status.id)}>{Translator.translateStatus(status.name)}</Option>
                ))}
            </Select>
        </div>
    );
};

export default FilterSection;