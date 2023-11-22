import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/header';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import RHFTextField from '../../hookForms/RHFTextField';
import FormProvider from '../../components/form';

const useStyles = makeStyles({
    container: {
        height: "100%",
        width: "100vh"
    },
    header: {
        width: "100%",
        background: "#62905B",
        padding: "15px",
        margin: "none",
        position: "fixed",
        top: 0,
        left: 0,
    },
    positionBox: {
        paddingTop: "10%",
        position: "fixed",
       
    }
})
function PageInitial(){
    const classes = useStyles()
    const methods = useForm()

    const {
        register,
        getValues,
        setValue,
        onSubmit
    } = methods

    return(
        <Container className={classes.container}>
             <Header />
            <FormProvider methods={methods} onSubmit={() => {}}>
            <Box >
                <RHFTextField
                    name={"search"}
                    label={"Pesquisar"}
                />
            </Box>
            </FormProvider>
        </Container>
    )
}
export default PageInitial