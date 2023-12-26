import { createSlice } from "@reduxjs/toolkit"
import { formatDate } from "../utils/convertData";
import { groupTickets, insertTicket } from "../connection_api/connection/connTicket";
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
        const dates = data.data
        const newDates = await Promise.all((dates ?? []).map(async (item) => await formatDate(item)));
     
        const newData = {
            matricula           : data.matricula,
            modo_pagamento      : payment[data.modo_pagamento].text,
            valor_pago          : Number(data.valor),
            valor_total         : data.valorTotTicket,
            tamanho             : optionsSize[data.size].text,
            classe              : data.classe,

        }

        await dispatch(insertTicket(newData, newDates))
    } 
}

export function sendDataTicketAxios(data){
    return async (dispatch) => {
        await dispatch(groupTickets(data))
    }
}