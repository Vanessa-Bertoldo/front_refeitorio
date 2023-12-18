import { logo } from "../../assets/logoB64"
import DialogPDF from "../../dialogs/dialogPdfGenerate"
import { LogoImg } from "../../assets/logoImgB64"
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDatePTBR } from "../convertData";
import moment from 'moment';

const currentDate = new Date()

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
      x1: 0, y1: 0,              // ponto inicial (x, y)
      x2: 182 * 72 / 25.4, y2: 0, // ponto final (x, y) - convertendo de milímetros para pontos
      lineWidth: 1,              // largura da linha
    },
  ],
};

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

export const listNutrition = (props) => {
  console.log("Props ", props)
  var dataNutrition = []
  if(props.model === 0 && props.data !== null && props.data !== ""){
    dataNutrition =  [
        {
          columns: [
            {
              text: 'DATA DE EMISSÃO: ' + formatDatePTBR(currentDate),
              fontSize: 12,
              bold: true,
              alignment: 'left',
            },
            {
              text: 'CLASSE : EXAMPLO',
              fontSize: 12,
              bold: true,
              alignment: 'left',
              
            }
          ],
        },
        { text: '\n\n', fontSize: 12 },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            fontSize: 12,
            body: [
              ['PRESENÇA', 'NOME', 'SETOR','CLASSE'],
              ...props.data.map((row) =>['x         ',row.ficha.setor, row.ficha.nome, row.ficha.classe])
            ],
          },
        },
    ]
  }else if(props.model === 1){
    dataNutrition = [
      {
        columns: [
          {
            text: 'DATA DE EMISSÃO: ' + formatDatePTBR(currentDate),
            fontSize: 12,
            bold: true,
            alignment: 'left',
          },
          {
            text: 'CLASSE : EXEMPLO',
            fontSize: 12,
            bold: true,
            alignment: 'left',
          },
        ],
      },
      { text: '\n\n', fontSize: 12 },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, "*", 100, 100, 100],
          fontSize: 10,
          body: [
            [
              { text: 'MATR.', alignment: 'center' },
              'NOME',
              'SETOR',
              {text:'DATA', alignment: 'center'},
              'VALOR UN.'
            ],
            ...props.data.map((row) => [
              { text: row.matricula, alignment: 'center',fontSize: 11 },
              { text: row.ficha.nome.slice(0, 12), fontSize: 11 },
              { text: row.ficha.setor.slice(0, 6) + ".", fontSize: 11 },
              {
                text: moment(row.data).format('DD/MM/YYYY'),
                alignment: 'center',
                fontSize: 11
              },
              {
                text: row.valor_pago.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }),
                alignment: "left"
              }
            ]),
          ],
        },
      },
    ];
    
  }else if(props.model === 2){
    console.log("Payent entrada")
    const payments = []
    const dataPayment = props.data
    const payment = dataPayment.modo_pagamento
    let paymentAVista = 0
    let paymentVale = 0
    let paymentIsento = 0
    let paymentOther = 0
    for(let i = 0; i < dataPayment.length ; i ++){
      if(payment === "DINHEIRO"){
        paymentAVista += dataPayment.valor_pago
      }else if(payment === "VALE"){
        paymentVale += dataPayment.valor_pago
      }else {
        paymentOther += dataPayment.valor_pago
      }
    }

    console.log("Payent ",  paymentAVista, paymentIsento, paymentOther, paymentVale)
  }
  
/*
  const bodyData = props.data.map((row) => ['x         ',row[1], row[0], row[2]]);

  const dataNutrition =  [
    {
      columns: [
        {
          text: 'DATA DE EMISSÃO: ' + formatDatePTBR(currentDate),
          fontSize: 12,
          bold: true,
          alignment: 'left',
        },
        {
          text: 'CLASSE : EXAMPLO',
          fontSize: 12,
          bold: true,
          alignment: 'left',
          
        }
      ],
    },
    { text: '\n\n', fontSize: 12 },
    {
    layout: 'lightHorizontalLines',
    table: {
      headerRows: 1,
      widths: ["*", "*", "*", "*"],
      fontSize: 12,
      body: [
        ['PRESENÇA', 'NOME', 'SETOR','CLASSE'],
        ...bodyData.map(row => row.map(cell => ({ text: cell, color: 'black' }))),
      ],
    },
  },
]
*/
  return dataNutrition;
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