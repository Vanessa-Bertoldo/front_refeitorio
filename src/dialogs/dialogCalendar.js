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

import { closedScreenLoader, openScreenLoader } from "../slices/sliceScreenLoader";
import { AlertYesNo } from "../utils/alerts/alertYesNo";
import { openPDFCalendar } from "../slices/slicePDFDialogCalendar";

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
        gridTemplateColumns: "50% 50%",
        padding: "10px",
        columnGap: "20px",
    },
    gridDatePicker: {
        gridArea: "header",
        display: "grid",
        gridTemplateColumns: "auto",
        padding: "10px",
        columnGap: "20px"
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
    const [dataCalendar, setDataCalendar] = useState(null);

    const dispatch = useDispatch()
    const classes = useStyles()

    const schema = yup.object().shape({
        data: yup.array().required("Dados inválidos"),
        valor: yup.number().required("Dados inválidos"),
        size: yup.number().min(1, "Dados inválidos").required("Dados inválidos")
       
    })
    
    const defaultValues = React.useMemo(() => ({
        nome: data !== null ? data.nome : "",
        matricula: data !== null ? data.matricula : 0, 
        classe: data !== null ? data.classe : "", 
        size: 0, 
        valor: 7.00,
        modo_pagamento: 0,
        data: [],
        valorTot: 0,
        qtdTotal: 0,
    }),[data]);
    

    const methods = useForm({
        resolver:           yupResolver(schema),
        defaultValues
    })

    const {
        getValues,
        setValue,
        trigger,
        reset, 
        control
    } = methods

    const dates = useWatch({
        control,
        name: "data"
    })

    const valor = useWatch({
        control,
        name: "valor"
    })

    //update values in field qtdValor and valor
    useEffect(() => {
        if(dates && dates.length > 0){
            const dateLen = dates.length
            setValue("valorTot", Number(dateLen) * Number(valor))
            setValue("qtdTotal", dateLen)
        }
    },[dates, valor])

    React.useEffect(() => {
        reset(data)
    },[data])

    const handleClose = () => {
        dispatch(closedDialogCalendar())
    }

    const handleView = async () => {
        await dispatch(openPDFCalendar())
    }

    const handleSave = async () => {
        const submit = await trigger()
        console.log("get ", getValues())
        if(submit){
            console.log("get ", getValues())
        }
        if(submit){
            const values = getValues()
            await dispatch(closedDialogCalendar())
            await AlertYesNo({async onClickConfirm(){
                await dispatch(openScreenLoader())
                await dispatch(sendDataForAxios(values))
                await dispatch(closedScreenLoader())
            }, onCancel(){
                
            },
            title: "Aviso",
            text: "Deseja salvar alterações?",
            icon: "warning"})
        }
    }

    

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
                            name="data" 
                            label="Selecione as datas das fichas" 
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFTextField
                            disabled
                            type={"number"}
                            name="matricula"
                            label="Matricula" 
                        />
                        <RHFTextField
                            disabled
                            name="nome"
                            label="Nome"
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFTextField
                            disabled
                            name="classe"
                            label="Classe"
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
                            name={"modo_pagamento"}
                            label="pagamento"
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
                <Button variant="contained" onClick={handleSave} className={`${classes.buttonGreen} ${classes.boldWhite}`}>SALVAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCalendar