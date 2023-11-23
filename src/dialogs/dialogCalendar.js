import React from "react"
//material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
//hook forms
import { useDispatch } from "react-redux"
import FormProvider from "../components/form"
//yup
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//Slices
import { closedDialogCalendar } from "../slices/sliceDialogCalendar"
import { useForm } from "react-hook-form";
import RHFTextField from "../hookForms/RHFTextField";
import RHFSelect from "../hookForms/RHFSelect";
import RHFMultipleDatePicker from "../hookForms/RHFMultipleDatePicker";

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
})

function DialogCalendar({open}){
    const payment = [{value:0, text: "a vista"}, {value: 1, text: "Vale"}, {value: 2, text: "isento"}]
    const options = [{value: 0, text:"Selecione"}, {value: 1, text:"Grande"}, {value: 2, text: "Pequena"}]
    const dispatch = useDispatch()
    const classes = useStyles()

    const schema = yup.object().shape({

    })

    const defaultValues = React.useMemo(() => ({
        name:"teste",
        matricula: "1477",
        payment: 0,
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
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle className={classes.title}>CALENDÁRIO</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={() => {}}>
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
                            name="monthYear"
                            label="Mês / Ano"
                            type="date"
                       />
                        <RHFSelect
                            label={"Pagamento"}
                            name="payment"
                            options={payment}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                    </Box>
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonGrey} ${classes.boldWhite}`}>VISUALIZAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
                <Button variant="contained" className={`${classes.buttonGreen} ${classes.boldWhite}`}>SALVAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogCalendar