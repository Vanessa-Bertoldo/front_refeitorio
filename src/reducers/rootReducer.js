import { combineReducers } from 'redux';
import dialogRegisterReducer from '../slices/sliceDialogRegister';
import dialogNutritionReducer from '../slices/sliceDialogNutrition'

const rootReducer = combineReducers({
  dialogRegister:             dialogRegisterReducer,
  dialogNutrition:            dialogNutritionReducer
});

export default rootReducer;