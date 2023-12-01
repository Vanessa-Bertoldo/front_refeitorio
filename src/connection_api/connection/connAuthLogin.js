import { DB_CONNECTION } from "../dbConnection";
import { AxiosPost } from "../constantsConnection";
import { getDataFicha } from "./connFicha";

export const loginAsync = (dto) => async (dispatch) => {
  try {
    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_AUTH, dto);
    console.log("response ", response.status)
    if(response.status === 200){
      await dispatch(getDataFicha())
    }
    console.log("dispachei")
    return response.status
  } catch (error) {
    console.log("error ", error)
    return error.status
  }
};
