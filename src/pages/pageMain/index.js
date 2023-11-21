import React, { useState } from 'react';
import RHFTextField from '../../hookForms/RHFTextField';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Box, Button, Container, Typography, makeStyles } from '@material-ui/core';
import logo from "../../assets/logo.png";
import background from "../../assets/background.jpg";

import PageInitial from '../pageInital';
import { checkLogin } from '../../slices/sliceDialogRegister';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
//import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles({
    container: {
      display: "flex",
      height: "100%",
      margin:"0",
    },
    divLogin: {
      width: "50%",
      backgroundColor: "#62905B",
      textAlign: "center"
    },
    divImage: {
      width: "50%",
      height: "100%",
      //backgroundImage: `url(${background})`
    },
    containerMain:{
      height: "100%",
      width: "100%"
    },
    image:{
      width: "100%",
      opacity: "0.4",
      
    }, 
    textField: {
      backgroundColor: "white",
      borderRadius: "10px",
      width: "100%" //esta sem responsidade
    },
    boxMain: {
      width:"100%",
      textAlign: "--webkit-center"
    },
    box: {
      padding: "20px",
      width: "100%",
      width:"100%"
    },
    boxButton: {
      width: "100%",
      gridArea: "footer",
      
    }, 
    button: {
      width: "100%",
      backgroundColor: "#013D25",
      color: "white",
      fontStyle: "bold",
      fontSize: "1.25rem"
      
    },
    logo: {
      padding:"20px"
    }
  
});

function PageMain(){
  const dispatch = useDispatch()
  const classes = useStyles()

    const [isLoggedIn, setLoggedIn] = useState(false)

    const schema = yup.object().shape({
      user: yup.string().required("Dados inválidos"),
      password: yup.string().required("Dados inválidos"),
    });

    /*const {handleSubmit, formState } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(schema),
    });
*/
    const handleClick = () => {
      dispatch(checkLogin(getValues()))
      setLoggedIn(true)
    }
    
    const methods = useForm()

    const {
        register,
        getValues,
        setValue,
        trigger,
        reset,
        control
    } = methods

    const testes = useWatch({
      control,
      name: "user",
    });

    React.useEffect(() => {
      console.log("texto ", getValues())
    },[testes])

   

    return(
      <div>
      {
        !isLoggedIn ? (
          <FormProvider methods={methods} onSubmit={() => {}}>
            <Container className={classes.containerMain}>
              <div className={classes.container}>
                <div className={classes.divImage}>
                  <img src={background} className={classes.image}/>
                </div>
                <div className={classes.divLogin}>
                  <img src={logo} className={classes.logo}/>
                  <Box className={classes.boxMain}>
                    <Box className={classes.box}>
                      <RHFTextField
                        name="user"
                        label="Usuário"
                        className={classes.textField}
                      />
                    </Box>
                    <Box className={classes.box}>
                      <RHFTextField
                        name="password"
                        label="Senha"
                        type="password"
                        className={classes.textField}
                      />
                    </Box>
                    <Box className={classes.boxButton}>
                      <Button className={classes.button} onClick={handleClick}>ENTRAR</Button>
                    </Box>
                  </Box>
                </div>
              </div>
            </Container>
            
          </FormProvider>
      ) : (
        <PageInitial/>
      )}
    </div>
       
    )
}

export default PageMain