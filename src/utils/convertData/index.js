import moment from "moment"

export const DATE_FORMAT = {
    FORMAT_EUA          :"YYYY/MM/DD",
    FORMAT_TIME_EUA     :"YYYY/MM/DD h:mm:ss",

    FORMAT_BR           :"DD/MM/YYYY",
    FORMAT_TIME_BR      :"DD/MM/YYYY h:mm:ss"

}

export function convertDate(DATE, FORMAT, CONVERT){
    const DATE_CONVERT = moment(DATE, CONVERT).format(FORMAT)
    return DATE_CONVERT
}

export const formatDate = (data) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateNew = new Date(data).toLocaleDateString(undefined, options);
    const [dia, mes, ano] = dateNew.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada
    //return new Date(data).toLocaleDateString(undefined, options);
    
  };