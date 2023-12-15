import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false
}

const pdfCalendar = createSlice({
    name: "pdfCalendar",
    initialState,
    reducers: {
        openPDFCalendar(state){
            state.open = true;
        },
        closedPDFCalendar(state){
            state.open = false;
        },
    }
})

export const { openPDFCalendar, closedPDFCalendar } = pdfCalendar.actions;
export default pdfCalendar.reducer;

