import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false
}

const dialogNutrition = createSlice({
    name: "dialogNutrition",
    initialState,
    reducers: {
        openDialogNutrition(state){
            state.open = true;
        },
        closedDialogNutrition(state){
            state.open = false;
        },
    }
})

export const { openDialogNutrition, closedDialogNutrition } = dialogNutrition.actions;
export default dialogNutrition.reducer;