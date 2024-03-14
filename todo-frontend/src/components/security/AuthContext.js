import { createContext, useContext, useState } from "react";

//1. create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


//2. share the created context with other components

//auth provider will provide context to other components
function AuthProvider({children}){

    //3. put some values state in the context
    const [ isAuthenticated, setAuthenticated ] = useState(false)

    function login(username,password){
        if (username === 'harshit' && password === 'qwerty') {
            console.log('Authentication success')
            setAuthenticated(true);
            return true;
        } else {
            console.log('Authentication failed')
            setAuthenticated(false);
            return false;
        }
    }

    function logout(){
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated ,login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


