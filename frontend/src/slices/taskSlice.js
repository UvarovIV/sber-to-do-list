import {createSlice} from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        set: (state, action) => {
            state.tasks = action.payload;
        }
    },
})

export const {set} = taskSlice.actions;

export default taskSlice.reducer;