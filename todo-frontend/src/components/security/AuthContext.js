import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService, executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//1. create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


//2. share the created context with other components

//auth provider will provide context to other components
function AuthProvider({children}){

    //3. put some values state in the context
    const [ isAuthenticated, setAuthenticated ] = useState(false)
    const [username, setUsername] = useState(null)
    const [ token, setToken] = useState(null)

    //HARD CODED AUTHENTICATION
    // function login(username,password){
    //     if (username === 'harshit' && password === 'qw') {
    //         // console.log('Authentication success')
    //         setAuthenticated(true);
    //         setUsername(username)
    //         return true;
    //     } else {
    //         // console.log('Authentication failed')
    //         setAuthenticated(false);
    //         return false;
    //     }
    // }

    // async function login(username,password){
    //     const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)
        

    //     const response = await executeBasicAuthenticationService(basicAuthToken)

    //     try {
    //         console.log(response)
    //         if( response.status == 200 ){
    //             setAuthenticated(true);
    //             setUsername(username)
    //             setToken(basicAuthToken)
    //             //get the api client and set the token into the header
    //              apiClient.interceptors.request.use((config) => {
    //                 // console.log('adding token')
    //                 config.headers.Authorization=basicAuthToken
    //                 return config
    //              })

    //             return true;
    //         }else{
    //             setAuthenticated(false);
    //             setUsername(null)
    //             setToken(null)
    //             return false;
    //         }
    //     }catch( error ){
    //         console.error(error)
    //         setAuthenticated(false);
    //         setUsername(null)
    //         setToken(null)
    //         return false;
    //     }
    // }

    async function login(username,password){
        

        const response = await executeJwtAuthenticationService(username,password)

        try {
            console.log(response)
            if( response.status == 200 ){
                
                setAuthenticated(true);
                setUsername(username)
                const jwtToken = `Bearer ${response.data.token}`
                // console.log(jwtToken)
                setToken(jwtToken)
                //get the api client and set the token into the header
                 apiClient.interceptors.request.use((config) => {
                    // console.log('adding token')
                    config.headers.Authorization=jwtToken
                    return config
                 })

                return true;
            }else{
                setAuthenticated(false);
                setUsername(null)
                setToken(null)
                return false;
            }
        }catch( error ){
            console.error(error)
            setAuthenticated(false);
            setUsername(null)
            setToken(null)
            return false;
        }
    }

    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }



    return (
        <AuthContext.Provider value={{ isAuthenticated ,login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


