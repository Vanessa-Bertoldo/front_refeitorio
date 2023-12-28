import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { closedDialogCalendar } from "../slices/sliceDialogCalendar";
import ReactFormProvider from "../components/form";
import React from "react";
import RHFMultiDateKeyboardPicker from "../hookForms/DatePicker";
import RHFTextField from "../hookForms/RHFTextField";
import { useForm } from "react-hook-form";
import RHFSelect from "../hookForms/RHFSelect";
import { optionsSize, payment } from "../utils/lists";
import { openPDFCalendar } from "../slices/slicePDFDialogCalendar";
import { groupTickets } from "../connection_api/connection/connTicket";



const useStyles = makeStyles({
    title: {
        textAlign: "center",
        backgroundColor: "#62905B",
        color: "white"
    },
    overflowHidden: {
        overflowX: "hidden"
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
        width: "100%",
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

function DialogCalendarSave(){
    const classes = useStyles()
    const dispatch = useDispatch()

    const data = useSelector((state) => state.dialogCalendar.data)
    const open = useSelector((state) => state.dialogCalendar.open)

    const defaultValues = React.useMemo(() => ({
        nome: data !== null ? data.nome : "",
        matricula: data !== null ? data.matricula : 0, 
        classe: data !== null ? data.classe : "", 
        size: 0
    }), [data])

    const methods = useForm({
        defaultValues
    })

    const {
        getValues,
        setValue,
        trigger,
        reset, 
        control
    } = methods

    const handleClose = () => {
        dispatch(closedDialogCalendar())
    }

    const handleView = async () => {
        const values = getValues() 
        //await dispatch(sendDataTicketAxios(values))
        await groupTickets(values)
        await dispatch(openPDFCalendar())
    }

    const handleSave = async () => {
        const submit = await trigger()
        console.log("get ", getValues())
        

        /*if(submit){
            const values = getValues() 

            const dataForm = {
                ...values,
                qtd,
                valorTotTicket
            }
            await dispatch(closedDialogCalendar())
            await AlertYesNo({async onClickConfirm(){
                //dispatch(openScreenLoader())
                await dispatch(sendDataForAxios(dataForm))
                //dispatch(closedScreenLoader())
                await dispatch(openPDFCalendar())
            }, onCancel(){
                
            },
            title: "Aviso",
            text: "Deseja salvar alterações?",
            icon: "warning"})
        }*/
    }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
            >
            <DialogTitle className={`${classes.title}`}>CALENDÁRIO</DialogTitle>
            <DialogContent className={`${classes.overflowHidden}`}>
                <ReactFormProvider methods={methods}>
                    <Box className={`${classes.gridDatePicker} ${classes.overflowHidden}`}>
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

export default DialogCalendarSave