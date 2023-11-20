import { Box, Button, makeStyles } from "@material-ui/core";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { openDialog } from "../../slices/sliceDialogRegister";

const useStyles = makeStyles({
    header: {
        width: "100%",
        background: "#62905B",
        padding: "15px",
        margin: "none",
        position: "fixed",
        top: 0,
        left: 0,
    },
    boxButton: {
       verticalAlign: "-webkit-baseline-middle"
    },
    button: {
        color: "#003C23",
        fontSize: "1.15rem",
        padding: "0px 15px",
        fontStyle: "bold",
        fontWeight: "900",
    },
    width100: {
        width: "100%",
        display: "flex"
    },
    width50: {
        width: "50%",
        alignSelf: "center"
    },
    imgDiv: {
        textAlignLast: "center",
        paddingRight: "10px"
        
    },
    img:{
        height: "70px"
    }
  });

function Header(){
    const dispatch = useDispatch()
    
    const openDialogRegister = () => {
        console.log("click executado")
        dispatch(openDialog())
    }

    const classes = useStyles()
    return(
        <header className={classes.header}>
            <Box className={classes.boxButton}>
                <div className={classes.width100}>
                    <div className={classes.width50}>
                        <Button className={classes.button} onClick={openDialogRegister}>Cadastrar ficha</Button>
                        <Button className={classes.button}>Nutrição</Button>
                    </div>
                    <div className={`${classes.width50} ${classes.imgDiv}`}>
                        <img src={logo} className={classes.img}/>
                    </div>
                </div>
            </Box>
        </header>
    )
}
export default Header