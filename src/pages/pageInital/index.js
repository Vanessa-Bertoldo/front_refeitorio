import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/header';
import { Box, Container, makeStyles } from '@material-ui/core';

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
        <Container className={classes.container}>
            <Box>
                <Header className={classes.header}/>
            </Box>
            <Box>
                <h1>So testando</h1>
            </Box>
        </Container>
    )
}
export default PageInitial