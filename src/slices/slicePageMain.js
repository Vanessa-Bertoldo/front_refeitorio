import { createSlice } from "@reduxjs/toolkit"
import { searchFichaByName } from "../connection_api/connection/connFicha";
import { setDataFicha } from "../utils/cache/cacheConfig";

const initialState = {
    list: []
}

const pageMain = createSlice({
    name: "pageMain",
    initialState,
    reducers: {
        addDataInList(state, action){
            state.list = action.payload
        },
       
    }
})

export const { addDataInList } = pageMain.actions;
export default pageMain.reducer;

export function insertDataInListFicha(data){
    return async (dispatch) => {
        if(data != null && data.data != null){
            await dispatch(pageMain.actions.addDataInList(data.data))
            setDataFicha(data.data)
        }
        
    }
}

export function fieldSearchByName(data){
    return async (dispatch) => {
        if(data !== null && data !== ""){
            await dispatch(searchFichaByName(data))
        }
    }
}