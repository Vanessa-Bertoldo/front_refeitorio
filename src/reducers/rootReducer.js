import { combineReducers } from 'redux';
import dialogRegisterReducer from '../slices/sliceDialogRegister';
import dialogNutritionReducer from '../slices/sliceDialogNutrition';
import dialogCalendarReducer from '../slices/sliceDialogCalendar';
import screenloaderReducer from '../slices/sliceScreenLoader';
import pageMainReducer from "../slices/slicePageMain";
import dialogPDFReducer from "../slices/sliceDialogPDF";
import pdfCalendarReducer from "../slices/slicePDFDialogCalendar";
import dialogDataXReducer from "../slices/sliceDataX";
import dialogClosureReducer from "../slices/slicePDFclosure"

const rootReducer = combineReducers({
  dialogRegister:             dialogRegisterReducer,
  dialogNutrition:            dialogNutritionReducer,
  dialogCalendar:             dialogCalendarReducer,
  screenLoader:               screenloaderReducer,
  pageMain:                   pageMainReducer,
  dialogPDF:                  dialogPDFReducer,
  pdfCalendar:                pdfCalendarReducer,
  dialogDataX:                dialogDataXReducer,
  dialogClosure:              dialogClosureReducer
});

export default rootReducer;