import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Header from '../../components/header';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import RHFTextField from '../../hookForms/RHFTextField';
import ReactFormProvider from '../../components/form';
import DialogCalendar from '../../dialogs/dialogCalendar';
import { useSelector } from 'react-redux';
import ListPageMain from '../../components/listPageMain';

const useStyles = makeStyles({
    container: {
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
       
    },
    header: {
        zIndex: 1000,
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
        width: "100%",
        height: "100%",
        textAlignLast: "center"
    },
    textField: {
        width: "100vh"
    },
    height100: {
        height: "100%"
    },
    padding10: {
        padding: "10px"
    },
    alignList: {
        textAlign: "-webkit-center"
    },
   
});

function PageInitial() {
    const classes = useStyles();
    const methods = useForm();

    const {
        register,
        getValues,
        setValue,
        onSubmit,
        control
    } = methods;

    const teste = useWatch({
        control,
        name:"search"
    })

    return (
        <Container className={classes.container}>
            <Header className={classes.header} />
            <ReactFormProvider methods={methods} >
                <Box className={classes.positionBox}>
                    <Box className={classes.padding10}>
                        <RHFTextField
                            name={"search"}
                            label={"Pesquisar"}
                            className={classes.textField}
                        />
                    </Box>
                    <Box className={`${classes.padding10} ${classes.alignList}`}>
                        <ListPageMain/>
                    </Box>
                </Box>
            </ReactFormProvider>
        </Container>
    );
}

export default PageInitial;
