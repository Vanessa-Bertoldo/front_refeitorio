import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    data: {}
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

export function receiveDataCalendar(data){
    return async (dispatch) => {
        await dispatch(dialogCalendar.actions.receiveData(data))
        
        console.log("data slice ", data)
    }
}