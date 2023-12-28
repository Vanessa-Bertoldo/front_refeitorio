import { DB_CONNECTION } from "../dbConnection";
import { AxiosGet, AxiosPost } from "../constantsConnection";
import { insertDataInListFicha } from "../../slices/slicePageMain";
import { setDataFicha } from "../../utils/cache/cacheConfig";

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
  try{
    const data = {
      matricula: dto.matricula, 
      nome: dto.nome, 
      setor: dto.setor, 
      classe:  dto.classe, 
      tamanho: dto.tamanho
    }
    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_FICHA, data)
    return response.status
  } catch(error) {
    return error.response.data.message
  }
}

export const getDataFichaFilter = (dto) => {

}

export const searchFichaByName = (data) => async (dispatch) =>{
  try{
    const newData = {
      name: data
    }
    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_SEARCH_FICHAS, newData)
    if(response.data.status === 200){
      const dataFicha = response.data.fichas
      setDataFicha(dataFicha)
    }
    return response
  } catch(error){
    return error
  }
}