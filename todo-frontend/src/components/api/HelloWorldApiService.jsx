import axios from 'axios'


// export function retrieveHelloWorldBean(){
//     return axios.get("http://localhost:8080/hello-world-bean")
// }

//arrow function
export const retrieveHelloWorldBean = () => axios.get("http://localhost:8080/hello-world-bean")