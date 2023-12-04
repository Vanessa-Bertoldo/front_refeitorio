import { createSlice } from "@reduxjs/toolkit"

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
            console.log("data da data ", data.data)
        }
        
    }
}