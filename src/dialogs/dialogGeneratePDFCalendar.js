import React from "react"
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import { useState } from "react";
import { useDispatch} from "react-redux";
import { cardsTicket, headerPDF, lineHorizontal } from "../utils/generatePDF";
import { closedPDFCalendar } from "../slices/slicePDFDialogCalendar";

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

const DialogPDFCalendar = ({open}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [pdfDataUrl, setPdfDataUrl] = useState('');
    const docDefinition = {
        content: [
          { text: 'Hello, World!' }, 
        ],
      };

    React.useEffect(() => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
          const pdfDocGenerator = pdfMake.createPdf(cardsTicket());
          pdfDocGenerator.getDataUrl((dataUrl) => {
          setPdfDataUrl(dataUrl);        
        });
      },[])
  
    const handleClose = () => {
        dispatch(closedPDFCalendar())
    }

    return (
        <Dialog 
            open={open} 
            maxWidth="lg" 
            fullWidth
            >
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

export default DialogPDFCalendar;