import {createSlice} from "@reduxjs/toolkit";

const selectedCategory = JSON.parse(localStorage.getItem("selected_category"));

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        selectedCategory: selectedCategory
    },
    reducers: {
        setAllCategories: (state, action) => {
            state.categories = action.payload.filter(category => category.name !== 'Архив');
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
})

export const {
    setAllCategories,
    setSelectedCategory
} = categoriesSlice.actions;

export default categoriesSlice.reducer;