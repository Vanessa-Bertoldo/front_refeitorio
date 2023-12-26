import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    dataListX: null,
    modelDataX: null
}

const dialogClosure = createSlice({
    name: "dialogClosure",
    initialState,
    reducers: {
        openDialogClosure(state){
            state.open = true;
        },
        closedDialogClosure(state){
            state.open = false
        },
        receiveData(state, action){
            state.dataListX = action.payload
        },
        receiveDataModel(state, action){
            state.modelDataX = action.payload
        }
    }
})
export const { openDialogClosure, closedDialogClosure } = dialogClosure.actions;
export default dialogClosure.reducer;

