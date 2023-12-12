import { DB_CONNECTION } from "../dbConnection";
import { AxiosGet, AxiosPost } from "../constantsConnection";
import { insertDataInListFicha } from "../../slices/slicePageMain";

/*export const loginAsyncFicha = (dto) => async (dispatch) => {
  try {
    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_FICHA, dto);
    console.log("response ", response.status)
    return response.status
  } catch (error) {
    console.log("error ", error)
    return error.status
  }
};*/


export const getDataFicha = () => async (dispatch) => {
  try{
    const response = await AxiosGet(DB_CONNECTION.LINK_SERVER_FICHA)
    dispatch(insertDataInListFicha(response))
    return response
  } catch(error) {
    return error.status
  }
}

export const insertDataFicha = (dto) => async (dispatch) => {
  console.log("dto receive ", dto)
  try{
    const data = {
      matricula: dto.matricula, 
      nome: dto.nome, 
      setor: dto.setor, 
      classe: dto.classe, 
      tamanho: dto.tamanho
    }
  
    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_FICHA, data)
    return response.status
  } catch(error) {
    console.log("error ", error)
    return error.response.data.message
  }
}

export const getDataFichaFilter = (dto) => {

}