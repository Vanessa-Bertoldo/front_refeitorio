import { AxiosGet } from "../constantsConnection"
import { DB_CONNECTION } from "../dbConnection"

export const getUsers = () => async (dispatch) => {
    console.log("entrando na função")
    try{
        const response = await AxiosGet(DB_CONNECTION.LINK_SERVER_USERS)
        console.log(response)
        return response
    } catch(error) {
        return error.status
    }
}