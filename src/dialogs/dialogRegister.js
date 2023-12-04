//react / redux
import React from "react"
import { useDispatch } from "react-redux"
//material ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import { closedDialog } from "../slices/sliceDialogRegister"
//hookform
import { useForm } from "react-hook-form"
//controllers
import ReactFormProvider from "../components/form"
import RHFTextField from "../hookForms/RHFTextField"
import RHFSelect from "../hookForms/RHFSelect"
//yup
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { insertDataFicha } from "../connection_api/connection/connFicha"
import { Alert } from "../utils/alerts"


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
        padding: "10px",
        columnGap: "20px"
   },
   title: {
        textAlign: "center",
        backgroundColor: "#62905B",
        color: "white"
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
    const listClass = [{value: 0, text: "Selecione"}, {value: 1, text:"Empregado"}, {value: 2, text:"Diretor"}, {value: 3, text:"Voluntário"}, {value: 4, text:"Residente"}, {value: 5, text:"Visitante"}, {value: 6, text:"Professor"}, {value: 7, text:"Outros"}]
    const listOptions = [{value: 0, text: "Selecione"}, {value: 1, text: "Grande"}, {value: 2, text: "Pequena"}]

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closedDialog())
    }

    const classes = useStyles()

    const schema = yup.object().shape({
        nome: yup.string().required("Dados inválidos"),
        matricula: yup.string().required("Dados inválidos"),
        
    });
    
      const defaultValues = React.useMemo(() => {
        return {
          nome: '',
          matricula: '',
          setor: '',
          classe: 0,
          tamanho: 0
        };
      }, []); 
  
      const methods = useForm({
        resolver:           yupResolver(schema),
        defaultValues
      });
    
    const {
        register,
        getValues,
        setValue,
        reset,
        trigger
    } = methods

    async function saveData (){
        const res = await trigger()
        if(res){
            const values = getValues()
            const response = await dispatch(insertDataFicha(values))
            if(response === 200){
                Alert({title: "Sucesso", text: "Dados cadastrados com sucesso", icon:"success"})
                reset(defaultValues)
                dispatch(closedDialog())
            } else {
                Alert({title: "Erro", text: response, icon:"erro"})
            }
        }
    }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle className={classes.title}>CADASTRAR FICHA</DialogTitle>
            <DialogContent>
                <ReactFormProvider methods={methods}>
                    <Box className={classes.gridContainerCol1}>
                        <RHFTextField
                            name="nome"
                            label="Nome"
                            className={classes.textField}
                        />
                    </Box>
                    <Box className={classes.gridContainer}>
                        <RHFTextField
                            name="matricula"
                            label="Matricula"
                        />
                        <RHFTextField
                            name="setor"
                            label="Setor"
                        />
                    </Box>
                    <Box>
                        <div className={classes.gridContainer}>
                            <RHFSelect
                                    label={"Classe"}
                                    name="classe"
                                    options={listClass}
                                    onGetValue={(item) => item.value}
                                    onGetDescription={(item) => item.text}
                             />
                             <RHFSelect
                                    label={"Tamanho"}
                                    name="tamanho"
                                    options={listOptions}
                                    onGetValue={(item) => item.value}
                                    onGetDescription={(item) => item.text}
                             />
                        </div>
                    </Box>
                </ReactFormProvider>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={saveData} className={`${classes.buttonGreen} ${classes.boldWhite}`}>SALVAR</Button>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
            </DialogActions>
        </Dialog>
       
        
    )
}

export default DialogRegisterForm