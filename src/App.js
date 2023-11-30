import React from 'react';
import PageMain from './pages/pageMain';
import DialogRegisterForm from './dialogs/dialogRegister';
import DialogNutrition from './dialogs/dialogNutrition';
import { useSelector } from 'react-redux';
import Loader from './utils/loader';

export default function App() {
  const open = useSelector((state) => state.dialogRegister.open)
  const openScreenLoader = useSelector((state) => state.screenLoader.open)
  const openDialogNutri = useSelector((state) => state.dialogNutrition.open)

  return (
  <>
    <PageMain/>
    <DialogRegisterForm open={open}/>
    <DialogNutrition open={openDialogNutri}/>
    <Loader open={openScreenLoader}/>
  </>
  );
}
