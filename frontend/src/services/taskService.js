import axios from "axios";
import {set, setPriorities, setRegularities, setSelectedTask, setStatuses} from "../slices/taskSlice";
import authHeader from "./auth-header";

const API_URL = "/tasks";

const getAllTasks = (dispatch) => {
    return axios.get(API_URL,{headers: authHeader()}).then((response) => {
            dispatch(set(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};

const getTasksFromCategory = (category_id, dispatch) => {
    return axios.get(API_URL+`/categories?categoryId=${category_id}`,{headers: authHeader()}).then((response) => {
            dispatch(set(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};

const getTasksFromArchive = (dispatch) => {
    return axios.get(API_URL+`/archive`,{headers: authHeader()}).then((response) => {
            dispatch(set(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};

const getStatuses = (dispatch) => {
    return axios.get(API_URL+'/statuses',{headers: authHeader()}).then((response) => {
            dispatch(setStatuses(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setStatuses([]));
        });
}

const getRegularities = (dispatch) => {
    return axios.get(API_URL+'/regularities',{headers: authHeader()}).then((response) => {
            dispatch(setRegularities(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setRegularities([]));
        });
}

const getPriorities = (dispatch) => {
    return axios.get(API_URL+'/priorities',{headers: authHeader()}).then((response) => {
            dispatch(setPriorities(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setPriorities([]));
        });
}

const createTask = (category_id, task, dispatch) => {

    return axios.post(API_URL, task, {headers: authHeader()}).then(
        () => {
            getTasksFromCategory(category_id, dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const updateTask = (category_id, task, dispatch) => {

    return axios.put(API_URL, task, {headers: authHeader()}).then(
        () => {
            if (category_id === -1) {
                getAllTasks(dispatch)
            } else if (category_id === -2) {
                getTasksFromArchive(dispatch)
            } else {
                getTasksFromCategory(task.category.id, dispatch)
            }
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteTask = (category_id, task, dispatch) => {

    return axios.delete(API_URL+`/${task.id}`, {headers: authHeader()}).then(
        () => {
            if (category_id === -1) {
                getAllTasks(dispatch)
            } else if (category_id === -2) {
                getTasksFromArchive(dispatch)
            } else {
                getTasksFromCategory(task.category.id, dispatch)
            }
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const selectTask = (task, dispatch) => {
    dispatch(setSelectedTask(task))
}

const taskService = {
    getAllTasks,
    getTasksFromArchive,
    getTasksFromCategory,
    getPriorities,
    getRegularities,
    getStatuses,
    createTask,
    updateTask,
    deleteTask,
    selectTask,
};

export default taskService
