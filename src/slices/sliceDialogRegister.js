import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { loginAsync } from "../connection_api/connection/connAuthLogin";

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

export function checkLogin(dto){
    return async (dispatch) => {
        const response = await dispatch(loginAsync(dto))
        return response
    }
}