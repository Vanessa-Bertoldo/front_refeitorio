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
import { closedDialogNutrition } from "../slices/sliceDialogNutrition"
import { openDialogPDF } from "../slices/sliceDialogPDF"

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
        classSelect: 0,
        paymentSelect: 0,
        dateInitial: date.toISOString().split('T')[0],
        dateFinal: date.toISOString().split('T')[0]
    }),[])

    const schema = yup.object().shape({
        model: yup.number().min(1,)
    })

    const methods = useForm({
        resolver:           yupResolver(schema),
        defaultValues
    })
    const {
        register,
        getValues,
        setValue,
        trigger
    } = methods

    async function handleGenerate() {
       
    }

    const handleClose = () => {
        dispatch(closedDialogNutrition())
    }

    async function handleView () {
        dispatch(openDialogPDF())
        const submit = await trigger()
        if(submit){
            console.log(getValues())
        }
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
                            name="dateInitial"
                            label="Data Inicial"
                            type="date"
                       />
                       <RHFTextField
                            name="dateFinal"
                            label="Data Final"
                            type="date"
                       />
                    </Box>
                    <Box className={classes.gridContainerCol1}>
                        <RHFSelect
                            name={"classSelect"}
                            label="Classe"
                            options={classList}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                        <RHFSelect
                            name={"paymentSelect"}
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