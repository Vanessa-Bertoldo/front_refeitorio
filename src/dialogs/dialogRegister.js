import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import React from "react"
import { useDispatch } from "react-redux"
import FormProvider from "../components/form"
import { closedDialog } from "../slices/sliceDialogRegister"
import { useForm } from "react-hook-form"
import RHFTextField from "../hookForms/RHFTextField"
import RHFSelect from "../hookForms/RHFSelect"



const useStyles = makeStyles({
   textField: {
   },
   width100: {
    width: "100%"
   },
   width50:{
    width: "50%"
   },
   gridContainerCol1: {
        display: "grid",
        gridTemplateColumns: "auto",
        padding: "10px"
   },
   gridContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto",
        padding: "10px"
   },
   gridItem: {

   },
   title: {
        textAlign: "center"
   },
   buttonRed: {
        backgroundColor: "#ED2222",
        padding: "5px"
   },
   buttonGreen: {
        backgroundColor: "#45BD3A",
        padding: "5px"
   },
   boldWhite: {
    fontStyle: "bold",
    fontSize: "1.05rem",
    color: "white"
   }
  });

function DialogRegisterForm({open}){
    const listClass = [{value: 0, text: "zer"}, {value: 1, text:"um"}]

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closedDialog())
    }

    const classes = useStyles()
    const methods = useForm()

    const {
        register,
        getValues,
        setValue,
        trigger
    } = methods

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle className={classes.title}>Cadastrar ficha</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={() => {}}>
                    <Box className={classes.gridContainerCol1}>
                        <RHFTextField
                            name="name"
                            label="Nome"
                            className={classes.textField}
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFTextField
                            name="mat"
                            label="Matricula"
                            className={classes.gridItem}
                        />
                        <RHFTextField
                            name="setor"
                            label="Setor"
                            className={classes.gridItem}
                        />
                    </Box>
                    <Box>
                        <div className={classes.gridContainer}>
                            <RHFSelect
                                    name="class"
                                    options={listClass}
                                    onGetValue={(item) => item.value}
                                    onGetDescription={(item) => item.text}
                                    className={classes.gridItem}
                             />
                             <RHFSelect
                                    name="options"
                                    options={listClass}
                                    onGetValue={(item) => item.value}
                                    onGetDescription={(item) => item.text}
                             />
                        </div>
                    </Box>
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button variant="contained"className={`${classes.buttonGreen} ${classes.boldWhite}`}>SALVAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
            </DialogActions>
        </Dialog>
       
        
    )
}

export default DialogRegisterForm