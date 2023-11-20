import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    checkLogin: ""
};

const slice = createSlice({
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
export default slice.reducer;

export function openDialog(){
    return async (dispatch) => {
        dispatch(slice.actions.openDialog())
    };
}

export function closedDialog(){
    return async (dispatch) => {
        dispatch(slice.actions.closedDialog())
    };
}

export function checkLogin(odt){
    return async (dispatch) => {
        console.log("odt receive ", odt)
        dispatch(slice.actions.checkLogin)
    }
}