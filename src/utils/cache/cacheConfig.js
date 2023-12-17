export const CACHE_CONFIG = {
    LIST_TICKETS                           :   "LIST_TICKETS",
    DATA_LOGIN                             :   "DATA_LOGIN",
    DATA_FICHAS                            :   "DATA_FICHAS"

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