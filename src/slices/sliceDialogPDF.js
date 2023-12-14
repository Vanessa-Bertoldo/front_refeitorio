import { createSlice } from "@reduxjs/toolkit"
import pdfMake from 'pdfmake/build/pdfmake';

const initialState = {
    open: false,
    data: [],
    url: ""
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
        receiveUrl(state, action){
            state.url = action.payload
        }
    }
})
export const { openDialogPDF, closedDialogPDF } = dialogPDF.actions;
export default dialogPDF.reducer;

export function openDialogViewPDF(filters){
    console.log("filters ", filters)
    return async (dispatch) => {
        /*const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
            dispatch(dialogPDF.actions.receiveUrl(dataUrl))
        });*/
        dispatch(openDialogPDF())
    }
}

export function dataList(data) {
    return async (dispatch) => {
        const newList = [];

        if (data !== null) {
            const headerRow = ['Setor', 'Nome', 'Classe'];
            newList.push(headerRow);
            for (var i = 0; i < data.length; i++) {
                const list = data[i];
                const newData = [
                    list.ficha.setor,
                    list.ficha.nome,
                    list.ficha.classe
                ];
                newList.push(newData);
            }

            console.log("newDraw", newList);
            await dispatch(dialogPDF.actions.receiveData(newList));
        }
    };
}
