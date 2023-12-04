import { createSlice } from "@reduxjs/toolkit"
import pdfMake from 'pdfmake/build/pdfmake';

const initialState = {
    open: false,
    data: {},
    url: ""
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
        }, 
        receiveUrl(state, action){
            state.url = action.payload
        }
    }
})
export const { openDialogPDF, closedDialogPDF } = dialogPDF.actions;
export default dialogPDF.reducer;

export function openDialogViewPDF(documentDefinition){
    console.log("entrada slice")
    return async (dispatch) => {
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
            dispatch(dialogPDF.actions.receiveUrl(dataUrl))
        });
        dispatch(openDialogPDF())
    }
}