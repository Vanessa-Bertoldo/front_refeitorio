import { useForm } from "react-hook-form"
import FormProvider from "../components/form"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { closedDialogNutrition } from "../slices/sliceDialogNutrition"
import RHFDatePicket from "../hookForms/RHFDatePicker"

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
    padding: "10px"
    },
})

function DialogNutrition({open}){
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
            <DialogTitle>Nutrição</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={() => {}}>
                    <Box className={classes.gridContainer}>
                        <RHFDatePicket
                            label="Data inicio"
                            name="dateInitial"
                            format="MM/dd/yyyy"
                            margin="normal"
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