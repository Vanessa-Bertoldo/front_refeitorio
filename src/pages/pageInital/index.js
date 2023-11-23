import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/header';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import RHFTextField from '../../hookForms/RHFTextField';
import FormProvider from '../../components/form';

const useStyles = makeStyles({
    container: {
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
    },
    header: {
        width: "100%",
        background: "#62905B",
        padding: "15px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    positionBox: {
        paddingTop: "10%",
        zIndex: 999,
    },
    textField: {
       
    }
});

function PageInitial() {
    const classes = useStyles();
    const methods = useForm();

    const {
        register,
        getValues,
        setValue,
        onSubmit
    } = methods;

    return (
        <Container className={classes.container}>
            <Header className={classes.header} />
            <FormProvider methods={methods} onSubmit={() => {}}>
                <Box className={classes.positionBox}>
                    <RHFTextField
                        name={"search"}
                        label={"Pesquisar"}
                        className={classes.textField}
                    />
                </Box>
            </FormProvider>
        </Container>
    );
}

export default PageInitial;
