import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
    },
})