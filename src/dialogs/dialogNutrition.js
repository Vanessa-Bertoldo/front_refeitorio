import { useForm } from "react-hook-form"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { closedDialogNutrition } from "../slices/sliceDialogNutrition"
import RHFTextField from "../hookForms/RHFTextField"
import RHFSelect from "../hookForms/RHFSelect"
import React, { useMemo } from "react"
import ReactFormProvider from "../components/form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';

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
    const classList = [{value: 0, text: "Selecione"}, {value: 1, text:"Empregado"}, {value: 2, text:"Diretor"}, {value: 3, text:"Voluntário"}, {value: 4, text:"Residente"}, {value: 5, text:"Visitante"}, {value: 6, text:"Professor"}, {value: 7, text:"Outros"}]
    const models = [{value: 0, text: "Diario"}, {value: 1, text: "Listagem"}, {value: 2, text: "Resumo"}, {value: 3, text: "Fechamento"}]
    const paymentList = [{value: 0, text: "À vista"}, {value: 1, text: "vale"}, {value: 3, text: "Isento"}]
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
        const submit = await trigger()
        if(submit){
            console.log(getValues())
        }
    }

    const handleClose = () => {
        dispatch(closedDialogNutrition())
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
                            options={paymentList}
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
                <Button variant="contained" onClick={handleGenerate} className={`${classes.buttonGrey} ${classes.boldWhite}`}>VISUALIZAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogNutrition