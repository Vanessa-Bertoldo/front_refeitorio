import { combineReducers } from 'redux';
import dialogRegisterReducer from '../slices/sliceDialogRegister';
import dialogNutritionReducer from '../slices/sliceDialogNutrition';
import dialogCalendarReducer from '../slices/sliceDialogCalendar';
import screenloaderReducer from '../slices/sliceScreenLoader';

const rootReducer = combineReducers({
  dialogRegister:             dialogRegisterReducer,
  dialogNutrition:            dialogNutritionReducer,
  dialogCalendar:             dialogCalendarReducer,
  screenLoader:               screenloaderReducer
});

export default rootReducer;