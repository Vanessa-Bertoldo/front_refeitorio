import { dataList } from "../../slices/sliceDialogPDF"
import { setListTicket } from "../../utils/cache/cacheConfig"
import { AxiosPost } from "../constantsConnection"
import { DB_CONNECTION } from "../dbConnection"

export const getDataToNutrition = (data) => async (dispatch) => {
  console.log("Dados conn ", data)
    try{
      const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_NUTRITION, data)
      console.log("Data for pdf ", response)
      if(response.data !== null){
        await dispatch(dataList(response.data))
        await setListTicket(response.data)
      }
     
      return response
    } catch(error) {
      return error.status
    }
  }