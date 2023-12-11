import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Registre as fontes
pdfmake.vfs = pdfFonts.pdfMake.vfs;

// Função para carregar uma imagem e converter para base64
function getImageBase64(url, callback) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); // Permite carregar imagens de diferentes domínios
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
  };
  img.src = url;
}

// Selecione o arquivo de imagem PNG
const imageUrl = 'caminho/para/sua/imagem.png';

// Chame a função para converter a imagem em base64
getImageBase64(imageUrl, (base64Image) => {
  // Defina o conteúdo do documento
  const documentDefinition = {
    content: [
      // Outros elementos do PDF, se houver...

      // Adicione a imagem usando a representação em base64
      {
        image: base64Image,
        width: 100, // Largura da imagem em pontos
        height: 100, // Altura da imagem em pontos
      },
    ],
  };

  // Crie o PDF
  const pdfDocGenerator = pdfmake.createPdf(documentDefinition);

  // Baixe o PDF ou abra em uma nova guia
  pdfDocGenerator.download('seu-arquivo-pdf.pdf');
});
