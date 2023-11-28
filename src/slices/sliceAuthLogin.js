import { createSlice } from "@reduxjs/toolkit";
import { DB_CONNECTION } from "../connection_api/dbConnection";
import { AxiosPost } from "../connection_api/constantsConnection";

export const loginAsync = (dto) => async (dispatch) => {
  try {
    //dispatch(stateOn()); // Se precisar despachar uma ação síncrona antes da assíncrona
    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_AUTH, dto);
    console.log("response ", response.status)
    return response.status
    //dispatch(loginSuccess(response.data)); // Substitua loginSuccess pela sua ação de sucesso
  } catch (error) {
    console.log("error ", error)
    return error.status
    //dispatch(loginFailure(error)); // Substitua loginFailure pela sua ação de falha
  }
};
