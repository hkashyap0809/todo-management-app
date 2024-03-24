import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`,{
    headers:{
        // Authorization:'Basic YWRtaW46YWRtaW4='
        Authorization:token
    }
})


export const executeJwtAuthenticationService = (username,password) => apiClient.post(`/authenticate`,{username,password})