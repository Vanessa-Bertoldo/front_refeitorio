import { logo } from "../../assets/logoB64"
import DialogPDF from "../../dialogs/dialogPdfGenerate"
import { LogoImg } from "../../assets/logoImgB64"
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDatePTBR } from "../convertData";
import moment from 'moment';
import { getFilterTotais, getGroupTicket } from "../cache/cacheConfig";
import { nameMonth, stringToArray } from "../convertValues";

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

const formatDate = (date) => {
  return {
    text: moment(date).format('DD/MM/YYYY'),
    alignment: 'center',
    fontSize: 11
  }
 
}

const formatMoney = (value) => {
   return {
    text: value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }),
    alignment: "right",
  }
}

const textAlign = (text, alignment,fillColor) => {
  return  {
    text: text,
    alignment: alignment,
    fontSize: 11,
    fillColor: fillColor
  }
}

export const listX = (props) => {
  const datalistFilter = getFilterTotais()
  let dataNutrition = []
  console.log("datalistFilter ", datalistFilter)
    if(datalistFilter !== null){
      console.log("datalistFilter !== null ", datalistFilter)
      console.log("TOTAIS ", datalistFilter )
      var totG = 0;
      var totP = 0;
      var qtdTickets = 0;
      var totalpayment = 0;
  
      for (var i = 0; i < datalistFilter.length; i++) {
          totG += Number(datalistFilter[i].quantidadeG);
          totP += Number(datalistFilter[i].quantidadeP);
          qtdTickets += Number(datalistFilter[i].quantidadeTickets);
          totalpayment += Number(datalistFilter[i].total);
      }
  
      console.log("TOTAIS ", totP , totG , totalpayment , qtdTickets  )
      dataNutrition =  [
        {
          columns: [
            {
              text: 'DATA DE EMISSÃO: ' + formatDatePTBR(currentDate),
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
            widths: ["*", "*", "*", "*", "*"],
            fontSize: 12,
            body: [
              [
                textAlign('DATA', "center", "#B3D4AE"), 
                textAlign('GRAN', "center", "#B3D4AE"),
                textAlign('PQN', "center", "#B3D4AE"),
                textAlign('QTD. TOT', "center", "#B3D4AE"),
                textAlign('TOTAL', "right", "#B3D4AE")],
              ...datalistFilter.map((row) =>[
                formatDate(row.dia),
                textAlign(row.quantidadeG, "center"),
                textAlign(row.quantidadeP, "center"),
                {
                  text: row.quantidadeTickets,
                  alignment: 'center',
                  fontSize: 11
                },
                textAlign(row.total, "right")
                 ]),
                 [{ text: '', colSpan: 5, border: [false, false, false, true], margin: [0, 5, 0, 0] }]
            ],
            
          },
        },
        { text: '\n\n\n', fontSize: 12 },
        {
          layout:{
  
          },
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            fontSize: 12,
            body: [
              [
                textAlign('TOT. GRAN.', "center", "#B3D4AE"),
                textAlign('TOT. PQN', "center", "#B3D4AE"),
                textAlign('QTD. TOT', "center", "#B3D4AE"),
                textAlign('TOTAL', "right", "#B3D4AE")
              ],
              [
                textAlign(totG, "center"),
                textAlign(totP, "center"),
                textAlign(qtdTickets, "center"),
                formatMoney(totalpayment)
              ]
              
            ],
            
          },
        }
    ]
    }
  return dataNutrition
    
}

export const listXResp = (props) =>{
  let dataNutrition = []
  const payment =  getFilterTotais()
  if(payment !== null){
    console.log("Get fileters ", payment)
    const titles = ["MODALIDADE", "QUANTIDADE", "TOTAL"]
    dataNutrition =  [
      {
        columns: [
          {
            text: 'DATA DE EMISSÃO: ' + formatDatePTBR(currentDate),
            fontSize: 12,
            bold: true,
            alignment: 'left',
          },
          
        ],
      },
      { text: '\n\n', fontSize: 12 },
      {
        layout: {
          hLineWidth: () => 2, // Largura da linha horizontal
          vLineWidth: () => 2, // Largura da linha vertical
      },
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*"],
          fontSize: 12,
          body: [
            [
                titles,
                ...payment.map((row) => [
                    textAlign(row.modo_pagamento, "center", "#B3D4AE"),
                    textAlign(row.quantidadeTickets, "center", "#B3D4AE"),
                    {
                      text: formatMoney(Number(row.soma_total)),
                      fillColor: "#000",

                  },
                   
                ]),
            ],
        ],
          
        },
      },
      { text: '\n\n\n', fontSize: 12 },
    ]
  }
  return dataNutrition
}

export const listNutrition = (props) => {
  let dataNutrition = []
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
  }else if(props.model === 1 && props.data !== null && props.data !== ""){
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
              formatDate(row.data),
              formatMoney(row.valor_pago),
            ]),
          ],
        },
      },
    ];
    
  }/*else if(props.model === 2 && props.data !== null && props.data !== ""){
    const datalistFilter = getFilterTotais()
    console.log("datalistFilter ", datalistFilter)
    if(datalistFilter !== null){
      var totG = 0;
      var totP = 0;
      var qtdTickets = 0;
      var totalpayment = 0;
  
      for (var i = 0; i < datalistFilter.length; i++) {
          totG += Number(datalistFilter[i].quantidadeG);
          totP += Number(datalistFilter[i].quantidadeP);
          qtdTickets += Number(datalistFilter[i].quantidadeTickets);
          totalpayment += Number(datalistFilter[i].total);
      }
  
      console.log("TOTAIS ", totP , totG , totalpayment , qtdTickets  )
      dataNutrition =  [
        {
          columns: [
            {
              text: 'DATA DE EMISSÃO: ' + formatDatePTBR(currentDate),
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
            widths: ["*", "*", "*", "*", "*"],
            fontSize: 12,
            body: [
              [
                textAlign('DATA', "center", "#B3D4AE"), 
                textAlign('GRAN', "center", "#B3D4AE"),
                textAlign('PQN', "center", "#B3D4AE"),
                textAlign('QTD. TOT', "center", "#B3D4AE"),
                textAlign('TOTAL', "right", "#B3D4AE")],
              ...datalistFilter.map((row) =>[
                formatDate(row.dia),
                textAlign(row.quantidadeG, "center"),
                textAlign(row.quantidadeP, "center"),
                {
                  text: row.quantidadeTickets,
                  alignment: 'center',
                  fontSize: 11
                },
                textAlign(row.total, "right")
                 ]),
                 [{ text: '', colSpan: 5, border: [false, false, false, true], margin: [0, 5, 0, 0] }]
            ],
            
          },
        },
        { text: '\n\n\n', fontSize: 12 },
        {
          layout:{
  
          },
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            fontSize: 12,
            body: [
              [
                textAlign('TOT. GRAN.', "center", "#B3D4AE"),
                textAlign('TOT. PQN', "center", "#B3D4AE"),
                textAlign('QTD. TOT', "center", "#B3D4AE"),
                textAlign('TOTAL', "right", "#B3D4AE")
              ],
              [
                textAlign(totG, "center"),
                textAlign(totP, "center"),
                textAlign(qtdTickets, "center"),
                formatMoney(totalpayment)
              ]
              
            ],
            
          },
        }
    ]
    }
   
  } */
  /*else if(props.model === 3 && props.data !== null && props.data !== ""){
    const payment =  getFilterTotais()
    if(payment !== null){
      console.log("Get fileters ", payment)
      const titles = ["MODALIDADE", "QUANTIDADE", "TOTAL"]
      dataNutrition =  [
        {
          columns: [
            {
              text: 'DATA DE EMISSÃO: ' + formatDatePTBR(currentDate),
              fontSize: 12,
              bold: true,
              alignment: 'left',
            },
            
          ],
        },
        { text: '\n\n', fontSize: 12 },
        {
          layout: {
            hLineWidth: () => 2, // Largura da linha horizontal
            vLineWidth: () => 2, // Largura da linha vertical
        },
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            fontSize: 12,
            body: [
              [
                  titles,
                  ...payment.map((row) => [
                      textAlign(row.modo_pagamento, "center", "#B3D4AE"),
                      textAlign(row.quantidadeTickets, "center", "#B3D4AE"),
                      {
                        text: formatMoney(Number(row.soma_total)),
                        fillColor: "#000",
  
                    },
                     
                  ]),
              ],
          ],
            
          },
        },
        { text: '\n\n\n', fontSize: 12 },
      ]
    }
    
    
  }*/
  return dataNutrition;
};



export const cardsTicket = () => {
  console.log("GRUPOS  ", getGroupTicket())
  const tickets = getGroupTicket()
  const card = {
    content: tickets.map((ticket, index) => ([
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
          { text: 'REFERÊNCIA: ' + nameMonth(ticket.mes) + "/" + ticket.ano, width: 'auto' },
        ],
      },
      {
        text: 'Lista de Datas:',
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      {
        fontSize: 12,
        ul: stringToArray(ticket.datas),
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 500,
            y2: 5,
            lineWidth: 2,
            lineColor: '#000',
          },
        ],
      },
      {
        text: `Valor Total: R$ ` + ticket.soma_total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),  
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 10],
      },
      { text: '\n\n\n\n', fontSize: 12 },
    ])),
  }
  return card
}