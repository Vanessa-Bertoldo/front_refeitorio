import React from "react"
//material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
//hook forms
import { useDispatch, useSelector } from "react-redux"
import ReactFormProvider from "../components/form"
//yup
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//Slices
import { closedDialogCalendar } from "../slices/sliceDialogCalendar"
import { useForm } from "react-hook-form";
import RHFTextField from "../hookForms/RHFTextField";
import RHFSelect from "../hookForms/RHFSelect";
//lists
import { payment } from "../utils/lists";
import { openDialogPDF } from "../slices/sliceDialogPDF";

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
        columnGap: "20px"
    },
    width50: {
        width: "50%"
    }, 
    width100: {
        width: "100%"
    }
})

function DialogCalendar(){
    const data = useSelector((state) => state.dialogCalendar.data)
    const open = useSelector((state) => state.dialogCalendar.open)
    const dispatch = useDispatch()
    const classes = useStyles()
    let date = new Date()

    const schema = yup.object().shape({

    })

    const defaultValues = React.useMemo(() => ({
        name: data.nome,
        matricula: "",
        class: "",
        size:"",
        valueMonthYear: 0.00,
        payment: 0,
        monthYear: date.toISOString().split('T')[0]
    }),[])

    const methods = useForm({
        resolver:           yupResolver(schema),
        defaultValues:      defaultValues
    })

    const {
        register,
        getvalues,
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

    React.useEffect(() => {
        console.log("dados dialog", data)
    },[data])
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
        >
            <DialogTitle className={classes.title}>CALENDÁRIO</DialogTitle>
            <DialogContent>
                <ReactFormProvider methods={methods} >
                    <Box className={classes.gridContainer} fullWidth={true}>
                        <RHFTextField
                                name="monthYear"
                                label="Mês / Ano"
                                type="date"
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFTextField
                            name="matricula"
                            label="Matricula"
                        />
                        <RHFTextField
                            name="name"
                            label="Nome"
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFTextField
                            name="class"
                            label="Classe"
                        />
                        <RHFTextField
                            name="size"
                            label="Tamanho"
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFSelect
                            label={"Pagamento"}
                            name="payment"
                            options={payment}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                         <RHFTextField
                            name="valueMonthYear"
                            label="Valor"
                       />
                    </Box>
                    <Box className={classes.gridContainer}>
                       
                    </Box>
                </ReactFormProvider>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleView} className={`${classes.buttonGrey} ${classes.boldWhite}`}>VISUALIZAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
                <Button variant="contained" className={`${classes.buttonGreen} ${classes.boldWhite}`}>SALVAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCalendar