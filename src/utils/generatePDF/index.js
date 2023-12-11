export const spacing = [
    {
        border: [false, false, false, false],
        text: ''
    },
    {
        border: [false, false, false, false],
        text: ''
    },
]

export const lineHorizontal = {
  canvas: [
    {
      type: 'line',
      x1: 0, y1: 5, // ponto inicial (x, y)
      x2: 520, y2: 5, // ponto final (x, y) 
      lineWidth: 1, // largura da linha
    },
  ],
}

export const pdfListNutrition = {
    content: [
        {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [ '*', 'auto', 100, '*' ],
      
              body: [
                [ 'PRESENÇA', 'NOME', 'SETOR', 'CLASSE' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
              ]
            }
        },
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