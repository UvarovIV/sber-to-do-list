import axios from "axios";
import {setAllCategories, setSelectedCategory} from "../slices/categorySlice";
import authHeader from "./auth-header";

const API_URL = "/categories";

const getCategories = (dispatch) => {
    return axios.get(API_URL, {headers: authHeader()}).then((response) => {
            dispatch(setAllCategories(response.data))
            return response.data;
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setAllCategories([]));
        });
};

const createCategory = (category, dispatch) => {

    return axios.post(API_URL, category, {headers: authHeader()}).then(
        () => {
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
        () => {
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
        () => {
            getCategories(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)
        });
};

const selectCategory = (category, dispatch) => {
    localStorage.removeItem("selected_category");
    localStorage.setItem("selected_category", JSON.stringify(category));
    dispatch(setSelectedCategory(category))
}

const categoryService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    selectCategory,
};

export default categoryService