import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Registre as fontes
pdfmake.vfs = pdfFonts.pdfMake.vfs;

// Função para carregar uma imagem e converter para base64
export function getImageBase64(url, callback) {
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
    console.log("url ", dataURL)
    //return dataURL
  };
  console.log("url ", url)
  img.src = url;
}