import { DialogContent, DialogTitle } from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import FormProvider from "../components/form"
import { closedDialog } from "../slices/sliceDialogRegister"
import { useEffect } from "react"

function DialogRegisterForm(){
    const dispatch = useDispatch()
    const open = useSelector((state) => state.dialogRegister.open)

    const handleClose = () => {
        dispatch(closedDialog)
    }

    const classes = useStyles()
    const methods = useForm()

    const {
        register,
        getValues,
        setValue,
        trigger
    } = methods

    useEffect(() => {
        console.log("open value ", open)
    }, [open])


    return(
        <FormProvider methods={methods} onSubmit={() => {}}>
            <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
        >
            <DialogTitle>Cadastro de ficha</DialogTitle>
            <DialogContent>
                <h1>Testes estão sendo feitos</h1>
            </DialogContent>
            </Dialog>
        </FormProvider>
        
    )
}

export default DialogRegisterForm