import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Header from '../../components/header';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import RHFTextField from '../../hookForms/RHFTextField';
import ReactFormProvider from '../../components/form';
import DialogCalendar from '../../dialogs/dialogCalendar';
import { useSelector } from 'react-redux';

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
        width: "100%",
        height: "100%",
        textAlignLast: "center"
    },
    textField: {
        width: "100vh"
    }
});

function PageInitial() {
    const open = useSelector((state) => state.dialogCalendar.open)
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

    React.useEffect(() => {
        console.log("useWatch ", teste)
    }, [teste])

    return (
        <Container className={classes.container}>
            <Header className={classes.header} />
            <ReactFormProvider methods={methods} >
                <Box className={classes.positionBox}>
                    <RHFTextField
                        name={"search"}
                        label={"Pesquisar"}
                        className={classes.textField}
                    />
                </Box>
            </ReactFormProvider>
            <Container>
                <DialogCalendar open={open}/>
            </Container>
        </Container>
    );
}

export default PageInitial;
