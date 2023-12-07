import axios from "axios";
import { LINK_SERVER } from "./dbConnection";

export function AxiosPost(url, dto) {
    return axios({
        method: 'POST',
        url: url,
        withCredentials: true,
        data: dto,
        headers: {
            'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            throw error;
        });  
}

export function AxiosGet(url) {
    return axios.get(url)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            throw error; 
        });
        
}


export function AxiosGetRequest(url, dto) {
    return axios({
        method: 'POST',
        url: url,
        withCredentials: true,
        data: dto,
        headers: {
            'Content-Type': 'application/json',
        },
      })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        throw error;
    });
    
}
