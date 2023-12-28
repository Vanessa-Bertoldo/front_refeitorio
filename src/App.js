import React from 'react';
import PageMain from './pages/pageMain';
import DialogRegisterForm from './dialogs/dialogRegister';
import DialogNutrition from './dialogs/dialogNutrition';
import { useSelector } from 'react-redux';
import Loader from './utils/loader';
import DialogPDF from './dialogs/dialogPdfGenerate';
import DialogCalendar from './dialogs/dialogCalendar';
import DialogPDFCalendar from './dialogs/dialogGeneratePDFCalendar';
import DialogDataX from './dialogs/dialogPdfX';
import DialogPDFClosure from './dialogs/dialogPDFclosure';
import DialogCalendarSave from './dialogs/dialogCalendarSave';

export default function App() {
  const open = useSelector((state) => state.dialogRegister.open)
  const openScreenLoader = useSelector((state) => state.screenLoader.open)
  const openDialogNutri = useSelector((state) => state.dialogNutrition.open)
  const openDialogPDF = useSelector((state) => state.dialogPDF.open)
  const openDialogCalendar = useSelector((state) => state.dialogCalendar.open)
  const openPDFCalendar = useSelector((state) => state.pdfCalendar.open)
  const openDialogX = useSelector((state) => state.dialogDataX.openDialogX)
  const openDialogClosure = useSelector((state) => state.dialogClosure.open)

  return (
  <>
    <PageMain/>
    <DialogRegisterForm open={open}/>
    <DialogNutrition open={openDialogNutri}/>
    <Loader open={openScreenLoader}/>
    <DialogPDF open={openDialogPDF}/>
    {/*<DialogCalendar open={openDialogCalendar}/>*/}
    <DialogCalendarSave open={openDialogCalendar}/>
    <DialogPDFCalendar open={openPDFCalendar}/>
    <DialogDataX open={openDialogX}/>
    <DialogPDFClosure open={openDialogClosure}/>
  </>
  );
}
