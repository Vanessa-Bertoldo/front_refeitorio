import { combineReducers } from 'redux';
import dialogRegisterReducer from '../slices/sliceDialogRegister';
import dialogNutritionReducer from '../slices/sliceDialogNutrition';
import dialogCalendarReducer from '../slices/sliceDialogCalendar';
import screenloaderReducer from '../slices/sliceScreenLoader';
import pageMainReducer from "../slices/slicePageMain";

const rootReducer = combineReducers({
  dialogRegister:             dialogRegisterReducer,
  dialogNutrition:            dialogNutritionReducer,
  dialogCalendar:             dialogCalendarReducer,
  screenLoader:               screenloaderReducer,
  pageMain:                   pageMainReducer
});

export default rootReducer;