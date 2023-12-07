import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    data: null,
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
        },
        receiveData(state, action){
            state.data = action.payload
        }
    }
})
export const { openDialogCalendar, closedDialogCalendar } = dialogCalendar.actions;
export default dialogCalendar.reducer;

export function receiveDataAndOpenDialog(dto){
    return async (dispatch) => {
        console.log("entrada na slice ", dto)
        await dispatch(dialogCalendar.actions.receiveData(dto))
        await dispatch(dialogCalendar.actions.openDialogCalendar())
    }
}