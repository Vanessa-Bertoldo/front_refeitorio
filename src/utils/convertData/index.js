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