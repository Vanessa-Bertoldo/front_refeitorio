import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    data: {}
}

const dialogPDF = createSlice({
    name: "dialogPDF",
    initialState,
    reducers: {
        openDialogPDF(state){
            state.open = true;
        },
        closedDialogPDF(state){
            state.open = false
        },
        receiveData(state, action){
            state.data = action.payload
        }
    }
})
export const { openDialogPDF, closedDialogPDF } = dialogPDF.actions;
export default dialogPDF.reducer;
