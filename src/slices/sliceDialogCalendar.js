import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    data: {},
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

export function receiveDataAndOpenDialog(data){
    return async (dispatch) => {
        console.log("entrada na slice")
        await dispatch(dialogCalendar.actions.receiveData(data))
        await dispatch(dialogCalendar.actions.openDialogCalendar())
    }
}