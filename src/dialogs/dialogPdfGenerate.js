import React from "react"
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import { useState } from "react";
import { closedDialogPDF } from "../slices/sliceDialogPDF";
import { useDispatch } from "react-redux";
import { pdfGenerator } from "../utils/generatePDF";

const useStyles = makeStyles({
    buttonRed: {
        backgroundColor: "#ED2222",
        padding: "5px"
   },
   boldWhite: {
    fontStyle: "bold",
    fontSize: "1.05rem",
    color: "white"
   },
})

function DialogPDF({open}){
    const dispatch = useDispatch()
    const classes = useStyles()
    const [pdfDataUrl, setPdfDataUrl] = useState('');

    React.useEffect(() => {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const pdfDocGenerator = pdfMake.createPdf(pdfGenerator);
        pdfDocGenerator.getDataUrl((dataUrl) => {
        setPdfDataUrl(dataUrl);
        
      });
    },[])

    const handleClose = () => {
        dispatch(closedDialogPDF())
    }

    return (
        <Dialog open={open} maxWidth="lg" fullWidth>
            <DialogTitle>Visualizar PDF</DialogTitle>
            <DialogContent>
                <iframe
                    title="pdf-viewer"
                    src={pdfDataUrl}
                    width="100%"
                    height="500px"
                    style={{ border: 'none', fontSize: '16px' }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose} className={`${classes.buttonRed} ${classes.boldWhite}`}>FECHAR</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogPDF