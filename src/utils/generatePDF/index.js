import { logo } from "../../assets/logoB64"
import DialogPDF from "../../dialogs/dialogPdfGenerate"
import { LogoImg } from "../../assets/logoImgB64"

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

export const headerPDF = {
  table: {
      headerRows: 1,
      widths: ['auto', 350],
      heights: [30, 30],
      body: [
          [
              {
                  border: [false, false, false, false],
                  image: logo,
                  width: 150
              },
              {
                  border: [false, false, false, false],
                  text: 'NUTRIÇÃO E DIETÉTICA - NACJ',
                  style: 'header',
                  alignment: 'center',
              },

          ],
      ]
  }
}

export const openDialogPDFGenerate = (props) => {
  const dataList = [
    ['PRESENÇA', 'NOME', 'SETOR', 'CLASSE'],
]
  DialogPDF(true, dataList)
}

export const listNutrition = (props) => {
  console.log("Dados recebidos: ", props.data);

  const bodyData = props.data.map((row) => ['TESTE',row[0], row[1], row[2]]);
  console.log("Dados mapeados: ", bodyData);

  return {
    layout: 'lightHorizontalLines',
    table: {
      headerRows: 1,
      widths: ["*", "*", "*", "*"],
      fontSize: 12,
      body: [
        ['PRESENÇA','SETOR', 'NOME', 'CLASSE'],
        ...bodyData.map(row => row.map(cell => ({ text: cell, color: 'black' }))),
      ],
    },
  };
};



export const cardsTicket = () => {
  const card = {
    content: [
      {
        columns: [
          {
            image: LogoImg,
            fit: [50, 50], 
            alignment: 'left',
          },
          {
            text: 'Programação de Refeição',
            fontSize: 18,
            bold: true,
            alignment: 'left',
            margin: [10, 10], 
          },
        ],
      },
      { text: '\n', fontSize: 12 },
      {
        columns: [
          { text: 'Nome: Sua Referência', width: 'auto' },
        ],
      },
      {
        columns: [
          { text: 'Referência: DEZEMBRO/2023', width: 'auto' },
        ],
      },
      {
        text: 'Lista de Datas:',
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      {
        ul: [
          'Data 1: Valor 1',
          'Data 2: Valor 2',
          'Data 3: Valor 3',
        ],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 400, 
            y2: 5,
            lineWidth: 2,
            lineColor: '#000', 
          },
        ],
      },
      {
        text: 'Valor Total: R$ XXX,XX', 
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 10], 
      },
    ],
  }
  return card
}