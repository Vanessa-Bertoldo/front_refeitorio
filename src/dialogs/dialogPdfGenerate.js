import React from "react"
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import { useState } from "react";
import { closedDialogPDF } from "../slices/sliceDialogPDF";
import { useDispatch, useSelector } from "react-redux";
import { lineHorizontal, listNutrition, pdfNutrition } from "../utils/generatePDF";
import { logo } from "../assets/logoB64"
import { formatDatePTBR } from "../utils/convertData";

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

const DialogPDF = ({open, generate}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const data = useSelector((state) => state.dialogPDF.data)
    const model = useSelector((state) => state.dialogPDF.model)
    const currentDate = formatDatePTBR(new Date());

    const [pdfDataUrl, setPdfDataUrl] = useState('')

    const header = [
        ['PRESENÇA', 'NOME', 'SETOR', 'CLASSE'],
    ]

    pdfMake.vfs = {
      ...pdfFonts.pdfMake.vfs,
      'logoB64': logo,
    };

    

    const docDefinition = {
        content: [
          {
            columns: [
              {
                image: logo,
                fit: [150, 150], 
                alignment: 'left',
              },
              {
                text: 'NUTRIÇÃO E DIETÉTICA - NACJ',
                fontSize: 16,
                bold: true,
                alignment: 'left',
                margin: [0, 0, 550, 0], // Adicione um valor para a margem inferior (índice 2)
              },
            ],
          },
          listNutrition({ data: data, model: model })
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          paragraph: {
            fontSize: 12,
            margin: [0, 0, 0, 10],
          },
          lineHorizontal: {
            margin: [0, 5, 0, 5],
            fillColor: '#000',
            height: 1,
          },
        },
      };

    React.useEffect(() => {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
        setPdfDataUrl(dataUrl);        
      });
    },[data])

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