import axios from "axios";
import { LINK_SERVER } from "./dbConnection";

export function AxiosPost(url, dto) {
    return axios({
        method: 'post',
        url: url,
        data: {
            user: dto.user,
            password: dto.password
        }
      })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        throw error;
    });
}

export function getAxios(url) {
    return axios.get(LINK_SERVER + url)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            throw error; 
        });
}
