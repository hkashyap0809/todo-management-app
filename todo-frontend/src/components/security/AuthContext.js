import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";

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

    async function login(username,password){
        const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)
        

        const response = await executeBasicAuthenticationService(basicAuthToken)

        try {
            console.log(response)
            if( response.status == 200 ){
                setAuthenticated(true);
                setUsername(username)
                setToken(basicAuthToken)
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


