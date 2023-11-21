import { useForm } from "react-hook-form"
import FormProvider from "../components/form"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, makeStyles } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { closedDialogNutrition } from "../slices/sliceDialogNutrition"
import RHFDatePicket from "../hookForms/RHFDatePicker"
import RHFTextFieldDate from "../hookForms/RHFTextFieldDate"
import RHFTextField from "../hookForms/RHFTextField"
import RHFSelect from "../hookForms/RHFSelect"

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
},
})

function DialogNutrition({open}){
    const options = [{value: 0, text: "So to testando"}, {value: 1, text: "Só to testando"}]
    const classes = useStyles()
    const dispatch = useDispatch()
    const methods = useForm()

    const {
        register,
        getValues,
        setValue,
        trigger
    } = methods

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
            <DialogTitle className={classes.title}>Nutrição</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={() => {}}>
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
                            name="class"
                            label="Class"
                            options={options}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                        <RHFSelect
                            name="model"
                            label="Modelo"
                            options={options}
                            onGetValue={(item) => item.value}
                            onGetDescription={(item) => item.text}
                        />
                    </Box>
                </FormProvider> 
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonGrey} ${classes.boldWhite}`}>VISUALIZAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogNutrition