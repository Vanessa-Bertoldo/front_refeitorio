export const CACHE_CONFIG = {
    LIST_TICKETS                           :   "LIST_TICKETS",
    DATA_LOGIN                             :   "DATA_LOGIN",
    DATA_FICHAS                            :   "DATA_FICHAS",
    FILTER_TOTAIS                          :   "FILTER_TOTAIS",
    GROUP_TICKETS                          :   "GROUP_TICKET"

}

export const getListTicket = () => {
    return localStorage.getItem(CACHE_CONFIG.LIST_TICKETS)
}
export const setListTicket = (data) => {
    return localStorage.setItem(CACHE_CONFIG.LIST_TICKETS, data)
}

export const getDataFicha = () => {
    const storedData =  localStorage.getItem(CACHE_CONFIG.DATA_FICHAS)
    return storedData ? JSON.parse(storedData) : null;
}
export const setDataFicha = (data) => {
    const dataString = JSON.stringify(data);
    return localStorage.setItem(CACHE_CONFIG.DATA_FICHAS, dataString)
}

export const getDataLogin = () => {
    const storedData =  localStorage.getItem(CACHE_CONFIG.DATA_LOGIN)
    return storedData ? JSON.parse(storedData) : null;
}
export const setDataLogin = (data) => {
    const dataString = JSON.stringify(data);
    return localStorage.setItem(CACHE_CONFIG.DATA_LOGIN, dataString)
}


export const getFilterTotais = () => {
    const storedData =  localStorage.getItem(CACHE_CONFIG.FILTER_TOTAIS)
    return storedData ? JSON.parse(storedData) : null;
}
export const setFilterTotais = (data) => {
    const dataString = JSON.stringify(data);
    return localStorage.setItem(CACHE_CONFIG.FILTER_TOTAIS, dataString)
}

export const getGroupTicket = () => {
    const storedData =  localStorage.getItem(CACHE_CONFIG.GROUP_TICKETS)
    return storedData ? JSON.parse(storedData) : null;
}
export const setGroupTicket = (data) => {
    const dataString = JSON.stringify(data);
    return localStorage.setItem(CACHE_CONFIG.GROUP_TICKETS, dataString)
}