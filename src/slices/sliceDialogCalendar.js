import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false
}

const dialogCalendar = createSlice({
    name: "dialogCalendar",
    initialState,
    reducers: {
        openDialogCalendar(state){
            state.open = true;
        },
        closedDialogCalendar(state){
            state.open = false
        }
    }
})
export const { openDialogCalendar, closedDialogCalendar } = dialogCalendar.actions;
export default dialogCalendar.reducer;