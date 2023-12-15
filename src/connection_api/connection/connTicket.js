import { AlertSucess } from "../../utils/alerts/alertSucess"
import { formatDate } from "../../utils/convertData"
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
                    console.log("respçonse ", response)
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