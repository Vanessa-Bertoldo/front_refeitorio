import { combineReducers } from 'redux';
import dialogRegisterReducer from '../slices/sliceDialogRegister';

const rootReducer = combineReducers({
  dialogRegister: dialogRegisterReducer,
});

export default rootReducer;