import axios from "axios";
import {set} from "../slices/categorySlice";
import authHeader from "./auth-header";

const API_URL = "/categories";

const getCategories = (dispatch) => {
    return axios.get(API_URL, {headers: authHeader()}).then((response) => {
            dispatch(set(response.data))
            return response.data; // Вернуть данные категорий
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(set([]));
        });
};

const createCategory = (category, dispatch) => {

    return axios.post(API_URL, category, {headers: authHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const updateCategory = (category, dispatch) => {
    return axios.put(API_URL, category, {headers: authHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const deleteCategory = (id, dispatch) => {
    return axios.delete(API_URL + `?idCategory=${id}`, {headers: authHeader()}).then(
        (response) => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const categoryService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};

export default categoryService