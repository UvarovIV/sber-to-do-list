import moment from 'moment';

const FilterUtils = (tasks, searchValue, selectedDate, selectedStatus) => {
    return tasks.filter((task) => {
        if (searchValue && !task.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return false;
        }
        if (selectedDate) {
            if (!task.date || moment(task.date).format("YYYY-MM-DD") !== selectedDate.format("YYYY-MM-DD")) {
                return false;
            }
        }
        if (selectedStatus && task.status.id !== parseInt(selectedStatus)) {
            return false;
        }
        return true;
    });
};

export default FilterUtils;