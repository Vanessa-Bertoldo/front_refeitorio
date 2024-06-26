import React, { useState } from 'react';
import RHFTextField from '../../hookForms/RHFTextField';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, Grid, makeStyles } from '@material-ui/core';
import logo from "../../assets/logo.png";
import backfood from "../../assets/backfood.jpg";
import PageInitial from '../pageInital';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactFormProvider from '../../components/form';
import { loginAsync } from '../../connection_api/connection/connAuthLogin';
import { Alert } from '../../utils/alerts';
import { getUsers } from '../../connection_api/connection/connUsuarios';
import { closedScreenLoader, openScreenLoader } from '../../slices/sliceScreenLoader';

const useStyles = makeStyles({
    container: {
      display: "flex",
      height: "97%",
      width: "100%",
      margin:"0",
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundImage: `url(${backfood})`,
      
    },
    divLogin: {
      width: "50%",
      backgroundColor: "#62905B",
      opacity: "0.92",
      textAlign: "center",
    },
    divImage: {
      width: "50%",
      height: "100%",
    },
    containerMain:{
      height: "100vh",
      width: "100%",
      verticalAlign: "center",
      backgroundImage: `url${backfood}`
    },
    image:{
      width: "100%",
      opacity: "0.4",
      
    }, 
    textField: {
      backgroundColor: "white",
      borderRadius: "10px",
      width: "100%"
    },
    boxMain: {
      width:"100%",
      display: "grid",
      gridTemplateColumns: "auto",
      gap: "30px",
      textAlign: "--webkit-center"
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
      padding:"50px"
    },
    boxFiels: {
      textField: {
        backgroundColor: "white",
        borderRadius: "10px",
        width: "70%",
        margin: "10px 0", 
      },
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
  
    const defaultValues = React.useMemo(() => ({
        user: '',
        password: '',
    })); 

    const methods = useForm({
      resolver: yupResolver(schema),
      defaultValues
    });
  
    const {
      getValues,
      setValue,
      trigger,
      reset,
      control,
    } = methods;
  
    async function handleClick () {
        const result = await trigger();
        let values = getValues()
        if (result) {
          dispatch(openScreenLoader())
          const response = await dispatch(loginAsync(values))
          if(response === 200){
            setLoggedIn(true);
            dispatch(closedScreenLoader())
          } else {
            Alert({title: "Erro", text: "Usuario ou senha incorretos", icon:"erro"})
            dispatch(closedScreenLoader())
          }
        }
    };

    return (
    <div>
      {!isLoggedIn ? (
        <Container className={classes.containerMain}>
          <div className={classes.container}>
            <Grid container alignItems="center" justify="center" className={classes.divLogin}>
              <Grid item xs={12} sm={6} md={6} lg={8}> 
                <img src={logo} className={classes.logo} />
                <Box className={classes.boxMain}>
                  <ReactFormProvider methods={methods}>
                    <RHFTextField 
                      name="user"
                      label="Usuário" 
                      className={classes.textField}
                    />
                    <RHFTextField 
                      name="password"
                      label="Senha" 
                      type="password" 
                      className={classes.textField} 
                    />
                  </ReactFormProvider>
                  <Button 
                    className={classes.button} 
                    onClick={handleClick}
                    fullWidth>
                    ENTRAR
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Container>
      ) : (
        <PageInitial/>
      )}
    </div>
  );
}

export default PageMain