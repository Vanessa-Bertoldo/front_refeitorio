import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
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