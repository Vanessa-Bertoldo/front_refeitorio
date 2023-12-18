import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    open: false,
    data: [],
    model: 0
}

const dialogPDF = createSlice({
    name: "dialogPDF",
    initialState,
    reducers: {
        openDialogPDF(state){
            state.open = true;
        },
        closedDialogPDF(state){
            state.open = false
        },
        receiveData(state, action){
            state.data = action.payload
        }, 
        receiveModel(state, action){
            state.model = action.payload
        }
    }
})
export const { openDialogPDF, closedDialogPDF } = dialogPDF.actions;
export default dialogPDF.reducer;

export function selectModel(model){
    return async (dispatch) => {
        dispatch(dialogPDF.actions.receiveModel(model))
    }
}

export function dataList(data) {
    console.log("Data list ", data)
    return async (dispatch) => {
        const newList = [];
       
        if (data !== null) {
            for (var i = 0; i < data.length; i++) {
                const list = data[i];
                const newData = [
                   list.ficha.setor,
                   list.ficha.nome,
                   list.ficha.classe,
                ];
                newList.push(newData);
                
            }
            await dispatch(dialogPDF.actions.receiveData(data));
        }
        setTimeout(() => {
            dispatch(openDialogPDF())
        },[500])
         
    };
}
