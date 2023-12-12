import { createSlice } from "@reduxjs/toolkit"
import { formatDate } from "../utils/convertData";
import { insertTicket } from "../connection_api/connection/connTicket";
import { classList, optionsSize, payment } from "../utils/lists";

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
        await dispatch(dialogCalendar.actions.receiveData(dto))
        await dispatch(dialogCalendar.actions.openDialogCalendar())
    }
}

export function sendDataForAxios(data){
    return async (dispatch) => {
        const dates = data.dates
        const newDates = dates.map((item) => formatDate(item));
        const newData = {
            matricula           : data.matricula,
            modo_pagamento      : payment[data.pagamento].text,
            valor_pago          : data.valor,
            valor_total         : data.valorTot,
            tamanho             : optionsSize[data.size].text,
            classes             : classList[data.classe].text,

        }
        await dispatch(insertTicket(newData, newDates))
    } 
}