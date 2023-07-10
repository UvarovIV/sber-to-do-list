import axios from "axios";
import {set} from "../slices/taskSlice";
import authHeader from "./auth-header";

const API_URL = "/tasks";

const getTasksFromCategory = (category_id, dispatch) => {
    return axios.get(API_URL+`/categories?categoryId=${category_id}`,{headers: authHeader()}).then((response) => {
            dispatch(set(response.data))
            return response.data; // Вернуть данные
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};
const taskService = {
    getTasksFromCategory,
};

export default taskService
