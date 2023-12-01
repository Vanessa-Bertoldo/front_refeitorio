import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: []
}

const pageMain = createSlice({
    name: "dialogNutrition",
    initialState,
    reducers: {
        addDataInList(state, action){
            state.list = action.payload
        },
       
    }
})

export const { addDataInList } = pageMain.actions;
export default pageMain.reducer;

export function insertDataInListFicha(){
    return async (dispatch) => {
        //await dispatch()
        
        //console.log("data slice ", data)
    }
}