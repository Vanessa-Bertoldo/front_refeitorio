import { AxiosPost } from "../constantsConnection"
import { DB_CONNECTION } from "../dbConnection"

export const getDataToNutrition = (data) => async (dispatch) => {
    try{
      console.log("data ", data)
      const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_NUTRITION, data)
      //dispatch(receiveDataToPDF(response))
      console.log("Data for pdf ", response)
      return response
    } catch(error) {
      return error.status
    }
  }