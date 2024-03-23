import axios from 'axios'
import { apiClient } from './ApiClient'


// export function retrieveHelloWorldBean(){
//     return axios.get("http://localhost:8080/hello-world-bean")
// }

//arrow function


// const apiClient = axios.create(
//     {
//         baseURL:"http://localhost:8080"
//     }
// )
export const retrieveHelloWorldBean = () => apiClient.get("/hello-world-bean")

export const retrieveHelloWorldPathVariable = (username,token) => apiClient.get(`/hello-world/path-variable/${username}`)


export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`)