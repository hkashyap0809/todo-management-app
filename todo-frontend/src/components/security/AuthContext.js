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

    function login(username,password){
        const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)
        executeBasicAuthenticationService(basicAuthToken)
        .then( response => console.log(response))
        .catch(error => console.log(error))


        setAuthenticated(false)

        // if (username === 'harshit' && password === 'qw') {
        //     // console.log('Authentication success')
        //     setAuthenticated(true);
        //     setUsername(username)
        //     return true;
        // } else {
        //     // console.log('Authentication failed')
        //     setAuthenticated(false);
        //     return false;
        // }
    }

    function logout(){
        setAuthenticated(false)
    }



    return (
        <AuthContext.Provider value={{ isAuthenticated ,login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


