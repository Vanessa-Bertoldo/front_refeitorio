export const CACHE_CONFIG = {
    LIST_TICKETS                           :   "LIST_TICKETS",
    DATA_LOGIN                             :   "DATA_LOGIN"

}

export const getListTicket = () => {
    return localStorage.getItem(CACHE_CONFIG.LIST_TICKETS)
}
export const setListTicket = (data) => {
    console.log("lista ", data)
    return localStorage.setItem(CACHE_CONFIG.LIST_TICKETS, data)
}

export const getDataLogin = () => {
    return localStorage.getItem(CACHE_CONFIG.DATA_LOGIN)
}
export const setDataLogin = (data) => {
    console.log("login receive ", data)
    return localStorage.setItem(CACHE_CONFIG.DATA_LOGIN, data)
}