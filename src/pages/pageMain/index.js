import React, { useState } from 'react';
import RHFTextField from '../../hookForms/RHFTextField';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Box, Button, Container, Typography, makeStyles } from '@material-ui/core';
import logo from "../../assets/logo.png";
import PageInitial from '../pageInital';

const useStyles = makeStyles({
  container: {
    color: props => props.color,
    height:"500px",
    width:"400px",
    textAlign: "center",
    borderStyle: "ridge"
  },
  boxText: {
    display: "grid",
    width: "100%"
  },
  boxField: {
    width: "100%",
    paddingBottom: "25px"
  },
  textField: {
    width: "250px",
  },
  image: {
    height: "70px",
    width: "",
    padding: "50px"
  },
  button: {
    background: "#62905B",
    width: "280px",
    color: "#fff",
    fontStyle: "bold"
  },
  root: {
    verticalAlign: "110px",
    width:"100%"
  }
  
});

function PageMain(){
const classes = useStyles()

  const [isLoggedIn, setLoggedIn] = useState(false)

    const handleClick = () => {
      setLoggedIn(true)
    }
    
    const methods = useForm()

    const {
        register,
        getValues,
        setValue,
        trigger,
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
            <Box className={classes.root}>
              <Container className={classes.container}>
                <img className={classes.image} src={logo}/>
                <Box className={classes.boxText}>
                  <Box className={classes.boxField}>
                    <RHFTextField
                      name={"user"}
                      label="Usuário"
                      className={classes.textField}
                    />
                  </Box>
                  <Box className={classes.boxField}>
                      <RHFTextField
                        name={"password"}
                        label="Senha"
                        className={classes.textField}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Button onClick={handleClick} variant="outlined" className={classes.button}>Entrar</Button>
                  </Box>
                </Container>
            </Box>
          </FormProvider>
      ) : (
        <PageInitial/>
      )}
    </div>
       
    )
}

export default PageMain