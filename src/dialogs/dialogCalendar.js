import React, { useEffect, useState } from "react"
//material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
//hook forms
import { useDispatch, useSelector } from "react-redux"
import ReactFormProvider from "../components/form"
//yup
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//Slices
import { closedDialogCalendar, sendDataForAxios } from "../slices/sliceDialogCalendar"
import { useForm, useWatch } from "react-hook-form";
import RHFTextField from "../hookForms/RHFTextField";
import RHFSelect from "../hookForms/RHFSelect";
//lists
import { classList, optionsSize, payment } from "../utils/lists";
import { openDialogPDF } from "../slices/sliceDialogPDF";
import RHFMultiDateKeyboardPicker from "../hookForms/DatePicker";

import { formatDate } from "../utils/convertData";
import { closedScreenLoader, openScreenLoader } from "../slices/sliceScreenLoader";

const useStyles = makeStyles({
    title: {
        textAlign: "center",
        backgroundColor: "#62905B",
        color: "white"
    },
    buttonRed: {
        backgroundColor: "#ED2222",
        padding: "5px"
    },
    boldWhite: {
        fontStyle: "bold",
        fontSize: "1.05rem",
        color: "white"
    },
    buttonGrey: {
        backgroundColor: "#3F3E3B",
        padding: "5px"
    },
    buttonGreen: {
        backgroundColor: "#3DA933",
        padding: "5px"
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        padding: "10px",
        columnGap: "20px",
    },
    gridDatePicker: {
        display: "grid",
        gridTemplateColumns: "auto",
        padding: "10px",
        columnGap: "20px",
    },
    width50: {
        width: "50%"
    }, 
    width100: {
        width: "100%"
    },
    datePicker: {
        height: '290px', 
        '& .react-multiple-datepicker-input': {
          fontSize: '16px', 
        },
      },
})

function DialogCalendar(){
    const data = useSelector((state) => state.dialogCalendar.data)
    const open = useSelector((state) => state.dialogCalendar.open)
    const [selectedDates, setSelectedDates] = useState([]);
    const arrayDates = []

    const dispatch = useDispatch()
    const classes = useStyles()
    let date = new Date()

    const schema = yup.object().shape({

    })

    const defaultValues = React.useMemo(() => ({
        nome: data !== null ? data.nome : "",
        matricula: data !== null ? data.matricula : 0, 
        classe: data !== null ? data.classe : 0,
        size: data !== null ? data.tamanho : 0,
        valor: 7.00,
        pagamento: 0,
        dates: [],
        valorTot: 0,
        qtdTotal: 0,
    }),[data])

    const methods = useForm({
        resolver:           yupResolver(schema),
        defaultValues
    })

    const {
        getValues,
        setValue,
        trigger,
        control
    } = methods

    const handleClose = () => {
        dispatch(closedDialogCalendar())
    }

    const handleView = () => {
        dispatch(openDialogPDF())
    }

    const handleSave = async () => {
        const submit = await trigger()
        if(submit){
            const values = getValues()
            //dispatch(openScreenLoader())
            await dispatch(sendDataForAxios(values))
            //dispatch(closedScreenLoader())
           
            console.log("getValues ", getValues())
        }
        
    }

    const valTot = useWatch({
        control,
        name: "dates"
    })

    //update values in field qtdValor and valor
    useEffect(() => {
        const dateLen = getValues("dates").length
        setValue("valorTot", Number(dateLen) * getValues("valor"))
        setValue("qtdTotal", dateLen)
    },[valTot])

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
        >
            <DialogTitle className={classes.title}>CALENDÁRIO</DialogTitle>
            <DialogContent>
                <ReactFormProvider methods={methods} >
                    <Box className={classes.gridDatePicker}>
                        <RHFMultiDateKeyboardPicker 
                            name="dates" 
                            label="Selecione as datas das fichas" 
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFTextField
                            type={"number"}
                            name="matricula"
                            label="Matricula" 
                        />
                        <RHFTextField
                            name="nome"
                            label="Nome"
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFSelect
                            name={"classe"}
                            label="Classe"
                            options={classList}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                         <RHFSelect
                            name={"size"}
                            label="Tamanho"
                            options={optionsSize}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFSelect
                            label={"Pagamento"}
                            name="pagamento"
                            options={payment}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                         <RHFTextField
                            type={"number"}
                            name="valor"
                            label="Valor"
                       />
                    </Box>
                    <Box className={classes.gridContainer}>
                    <RHFTextField
                            disabled
                            type={"number"}
                            name="qtdTotal"
                            label="Quantidade"
                       />
                         <RHFTextField
                            disabled
                            type={"number"}
                            name="valorTot"
                            label="Valor Total"
                       />
                    </Box>
                    <Box className={classes.gridContainer}>
                    </Box>
                </ReactFormProvider>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleView} className={`${classes.buttonGrey} ${classes.boldWhite}`}>VISUALIZAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
                <Button variant="contained" onClick={handleSave} className={`${classes.buttonGreen} ${classes.boldWhite}`}>SALVAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCalendar