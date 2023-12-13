//react/redux
import React from "react"
import { useDispatch } from "react-redux"
//hookform
import { useForm } from "react-hook-form"
import ReactFormProvider from "../components/form"
//material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
//yup
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
//utils
import { classList, models, payment } from "../utils/lists";
//controllers
import RHFTextField from "../hookForms/RHFTextField"
import RHFSelect from "../hookForms/RHFSelect"
//slices
import { closedDialogNutrition, receiveDataToPDF } from "../slices/sliceDialogNutrition"
import { openDialogPDF, openDialogViewPDF } from "../slices/sliceDialogPDF"
import { pdfGenerator } from "../utils/generatePDF/ex2"
import { closedScreenLoader, openScreenLoader } from "../slices/sliceScreenLoader"

const useStyles = makeStyles({
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
   gridContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        padding: "10px",
        gap: "20px"
    },
    gridContainerCol1: {
        display: "grid",
        gridTemplateColumns: "auto",
        padding: "10px",
        gap:"20px"
   },
   title: {
    textAlign: "center",
    backgroundColor: "#62905B",
    color: "white"
},
})

function DialogNutrition({open}){
    const classes = useStyles()
    const dispatch = useDispatch()
    let date = new Date()

    const defaultValues = React.useMemo(() => ({
        modelSelect: 0,
        classe: 0,
        modo_pagamento: 0,
        dataInicial: date.toISOString().split('T')[0],
        dataFinal: date.toISOString().split('T')[0]
    }),[])

    const schema = yup.object().shape({
        
    })

    const methods = useForm({
        resolver:           yupResolver(schema),
        defaultValues
    })
    const {
        register,
        getValues,
        setValue,
        trigger,
        reset
    } = methods

    async function handleGenerate() {
       
    }

    const handleClose = () => {
        //reset(defaultValues)
        dispatch(closedDialogNutrition())
    }

    async function handleView () {
        const values = getValues()
        await dispatch(openScreenLoader())
        await dispatch(receiveDataToPDF(values))
        await dispatch(closedScreenLoader())
        dispatch(openDialogViewPDF(values))
       
    }

    return(
        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth={true}
        >
            <DialogTitle className={classes.title}>NUTRIÇÃO</DialogTitle>
            <DialogContent>
                <ReactFormProvider methods={methods} >
                    <Box className={classes.gridContainer}>
                       <RHFTextField
                            name="dataInicial"
                            label="Data Inicial"
                            type="date"
                       />
                       <RHFTextField
                            name="dataFinal"
                            label="Data Final"
                            type="date"
                       />
                    </Box>
                    <Box className={classes.gridContainerCol1}>
                        <RHFSelect
                            name={"classe"}
                            label="Classe"
                            options={classList}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                        <RHFSelect
                            name={"modo_pagamento"}
                            label="pagamento"
                            options={payment}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                        <RHFSelect
                            name={"modelSelect"}
                            label="Modelo"
                            options={models}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                    </Box>
                </ReactFormProvider> 
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleView} className={`${classes.buttonGrey} ${classes.boldWhite}`}>VISUALIZAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogNutrition