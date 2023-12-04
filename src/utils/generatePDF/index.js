export const pdfGenerator = {
   
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
}