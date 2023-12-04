import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

// Carregar as fontes necessárias (por exemplo, Arial)
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfGenerator = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const generatePdf = () => {
    // Definir o conteúdo do PDF
    const documentDefinition = {
      content: [
        { text: 'Exemplo de PDF com pdfMake', style: 'header' },
        { text: 'Este é um parágrafo simples.', style: 'paragraph' },
        {
          ul: [
            'Item 1',
            'Item 2',
            'Item 3',
          ],
        },
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
      },
    };

    // Gerar o PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      // Abrir o PDF no dialog
      setOpenDialog(true);
      setPdfDataUrl(dataUrl);
    });
  };

  const [pdfDataUrl, setPdfDataUrl] = useState('');

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <h2>Gerador de PDF com pdfMake</h2>
      <Button variant="contained" color="primary" onClick={generatePdf}>
        Gerar PDF
      </Button>

      {/* Dialog para exibir o PDF */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Visualizar PDF</DialogTitle>
        <DialogContent>
          <iframe
            title="pdf-viewer"
            src={pdfDataUrl}
            width="100%"
            height="500px"
            frameBorder="0"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PdfGenerator;
