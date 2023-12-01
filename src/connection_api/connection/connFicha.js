import { DB_CONNECTION } from "../dbConnection";
import { AxiosGet, AxiosPost } from "../constantsConnection";

export const loginAsyncFicha = (dto) => async (dispatch) => {
  try {
    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_FICHA, dto);
    console.log("response ", response.status)
    return response.status
  } catch (error) {
    console.log("error ", error)
    return error.status
  }
};


export const getDataFicha = () => async (dispatch) => {
  console.log("entrei auq")
  try{
    const response = await AxiosGet(DB_CONNECTION.LINK_SERVER_FICHA)
    return response
  } catch(error) {
    return error.status
  }
}
