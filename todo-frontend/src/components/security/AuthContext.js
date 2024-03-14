import { createContext, useContext, useState } from "react";

//1. create a context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


//2. share the created context with other components

//auth provider will provide context to other components
function AuthProvider({children}){

    //3. put some values state in the context
    const [number, setNumber] = useState(10)
    const [ isAuthenticated, setAuthenticated ] = useState(false)


    const valueToBeShared = {number, isAuthenticated, setAuthenticated }

    // setInterval(
    //     () => setNumber(number+1),
    //     2000
    // )

    return (
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


