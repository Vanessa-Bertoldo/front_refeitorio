import { useDispatch } from "react-redux"
import { openDialogPDF } from "../../slices/sliceDialogPDF"
import { AlertSucess } from "../../utils/alerts/alertSucess"
import { setFilterTotais } from "../../utils/cache/cacheConfig"
import { formatDate } from "../../utils/convertData"
import { classListNutrition, paymentNutrition } from "../../utils/lists"
import { AxiosPost } from "../constantsConnection"
import { DB_CONNECTION } from "../dbConnection"

export const insertTicket = async (dto, listDates) => {
    const dateToday = await formatDate(new Date())
   
        try{
            for(let i=0; i<listDates.length; i++){
                const date = listDates[i]
                try{
                    const data = {
                        matricula:          dto.matricula,
                        data:               date.toString(),
                        modo_pagamento:     dto.modo_pagamento,
                        valor_pago:         dto.valor_pago,
                        valor_total:        dto.valor_pago,
                        registro:           dateToday,
                        tamanho:            dto.tamanho
                    }
                    const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_TICKET, data)
                   //return response.status
                } catch(error) {
                    return error
                }
            }
            await AlertSucess({title: "Sucesso", text: "Dados excluídos com sucesso", icon: "success"})
            return "sucess"
          } catch(error) {
            return error.response.data.message
          }
    
}

export const filterDataTickets = async (dto) => {
    try{
        const data = {
            dataInicial:        dto.dataInicial, 
            dataFinal:          dto.dataFinal,  
            modo_pagamento:     paymentNutrition[dto.modo_pagamento].text, 
            classe:             classListNutrition[dto.classe].text
        }
        const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_FILTER_DATE, data)
        const listData = response.data.data
        setFilterTotais(listData)
      
        return response
    } catch(err){
        return err.response.data.message
    }
    
}

export const sumPaymentTot = async (dto) => {
    try{
        const data = {
            dataInicial:        dto.dataInicial, 
            dataFinal:          dto.dataFinal,  
            classe:             classListNutrition[dto.classe].text
        }
        const response = await AxiosPost(DB_CONNECTION.LINK_SERVER_GROUP_TOT_PAYMENT, data)
        const listData = response.data.data
        console.log("listData ", listData)
        setFilterTotais(listData)
      
        return response
    } catch(err){
        return err.response.data.message
    }
}