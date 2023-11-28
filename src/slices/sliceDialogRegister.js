import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { loginAsyncFicha } from "../connection_api/connection/connFicha";

const initialState = {
    open: false,
    checkLogin: ""
};

const dialogRegister = createSlice({
    name: "dialogRegister",
    initialState,
    reducers: {
        openDialog(state){
            state.open = true;
        },
        closedDialog(state){
            state.open = false;
        },
        checkLogin(state, action){
            state.checkLogin = action.payload
        }
    }
});
export const { openDialog, closedDialog } = dialogRegister.actions;
export default dialogRegister.reducer;

/*export function openDialog(){
    return async (dispatch) => {
        dispatch(slice.actions.openDialog())
    };
}

export function closedDialog(){
    return async (dispatch) => {
        dispatch(slice.actions.closedDialog())
    };
}*/

export function checkLogin(dto){
    return async (dispatch) => {
        console.log("odt receive ", dto)
        const response = await dispatch(loginAsyncFicha(dto))
        console.log("response", response)
        return response
    }
}