const sortTasks = (tasks, sortBy, sortDirection) => {
    return [...tasks].sort((a, b) => {
        let result;
        if (sortBy === null) {
            result = b.id - a.id;
        } else if (sortBy === 'status') {
            result = a.status.id - b.status.id;
        } else if (sortBy === 'priority') {
            result = a.priority.id - b.priority.id;
        } else if (sortBy === 'regularity') {
            result = a.regularity.id - b.regularity.id;
        } else if (sortBy === 'date') {
            result = new Date(a.date) - new Date(b.date);
        }

        return sortDirection === 'asc' ? result : -result;
    });
};

export default sortTasks;