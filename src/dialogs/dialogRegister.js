import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import FormProvider from "../components/form"
import { closedDialog } from "../slices/sliceDialogRegister"
import { useEffect } from "react"
import { useForm } from "react-hook-form"



const useStyles = makeStyles({
   
  });

function DialogRegisterForm({open}){
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
        >
            <DialogTitle>Cadastro de ficha</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={() => {}}>
                    <h1>Testes estão sendo feitos</h1>
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button>SALVAR</Button>
                <Button onClick={handleClose}>FECHAR</Button>
            </DialogActions>
        </Dialog>
       
        
    )
}

export default DialogRegisterForm