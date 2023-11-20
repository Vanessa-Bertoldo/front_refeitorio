import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/header';
import { Box, Container, makeStyles } from '@material-ui/core';
import FormProvider from '../../components/form';

const useStyles = makeStyles({
    container: {
        height: "100%",
        background: "red"
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
        <FormProvider methods={methods} onSubmit={() => {}}>
            <Container className={classes.container}>
                <Box>
                    <Header/>
                </Box>
                <Box>
                <h1>container</h1>
                </Box>
            </Container>
        </FormProvider>
    )
}
export default PageInitial