import { createSlice } from "@reduxjs/toolkit"
import { getDataToNutrition } from "../connection_api/connection/connNutricion";
import { classList, payment } from "../utils/lists";

const initialState = {
    open: false,
    data: null
}

const dialogNutrition = createSlice({
    name: "dialogNutrition",
    initialState,
    reducers: {
        openDialogNutrition(state){
            state.open = true;
        },
        closedDialogNutrition(state){
            state.open = false;
        },
    }
})

export const { openDialogNutrition, closedDialogNutrition } = dialogNutrition.actions;
export default dialogNutrition.reducer;

export function receiveDataToPDF(data){
    return async (dispatch) => {
        const newData = {
            ...data,
            classe: classList[data.classe].text, 
            dataInicial: data.dataInicial, 
            dataFinal: data.dataFinal, 
            modo_pagamento: payment[data.modo_pagamento].text
        }
        console.log("entrada na slice ", newData)
        await dispatch(getDataToNutrition(newData))
    }
}