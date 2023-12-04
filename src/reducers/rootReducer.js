import { combineReducers } from 'redux';
import dialogRegisterReducer from '../slices/sliceDialogRegister';
import dialogNutritionReducer from '../slices/sliceDialogNutrition';
import dialogCalendarReducer from '../slices/sliceDialogCalendar';
import screenloaderReducer from '../slices/sliceScreenLoader';
import pageMainReducer from "../slices/slicePageMain";
import dialogPDFReducer from "../slices/sliceDialogPDF";

const rootReducer = combineReducers({
  dialogRegister:             dialogRegisterReducer,
  dialogNutrition:            dialogNutritionReducer,
  dialogCalendar:             dialogCalendarReducer,
  screenLoader:               screenloaderReducer,
  pageMain:                   pageMainReducer,
  dialogPDF:                  dialogPDFReducer
});

export default rootReducer;