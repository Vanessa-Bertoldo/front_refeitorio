import logo from "../../assets/logo.png"

export const pdfGenerator = {
    footer: {
      columns: [
        'Left part',
        { text: 'Right part', alignment: 'right' }
      ]
    },
    header: {
      margin: 10,
      columns: [
          /*{
              image: "../../assets/logoj.jpg",
              width: 40
          },*/
          {
              margin: [10, 0, 0, 0],
              text: 'Nutrição e Dietética - NACJ'
          }
      ]
    },
    content: [
        { text: 'txt1', style: 'header' },
        { text: 'txt2', style: 'paragraph' },
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