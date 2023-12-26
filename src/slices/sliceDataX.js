import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openDialogX: false,
    dataListX: null,
    modelDataX: null
}

const dialogDataX = createSlice({
    name: "dialogDataX",
    initialState,
    reducers: {
        openDialogDataX(state){
            state.openDialogX = true;
        },
        closedDialogDataX(state){
            state.openDialogX = false
        },
        receiveData(state, action){
            state.dataListX = action.payload
        },
        receiveDataModel(state, action){
            state.modelDataX = action.payload
        }
    }
})
export const { openDialogDataX, closedDialogDataX } = dialogDataX.actions;
export default dialogDataX.reducer;

export function receiveDataAndOpenDialog(dto){
    return async (dispatch) => {
        await dispatch(dialogDataX.actions.receiveDataModel(dto.model))
        await dispatch(dialogDataX.actions.receiveData(dto))
        await dispatch(dialogDataX.actions.openDialogDataX())
    }
}

export function openDialogX(){
    return async (dispatch) => {
        await dispatch(dialogDataX.actions.openDialogDataX())
    }
}

export function receiveDataModel(model){
    return async (dispatch) => {
        await dispatch(dialogDataX.actions.receiveDataModel(model))
    }
}