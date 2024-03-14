


import { createContext, useState } from "react";

//1. create a context
export const AuthContext = createContext()


//2. share the created context with other components

//auth provider will provide context to other components
function AuthProvider({children}){

    //3. put some values state in the context
    const [number, setNumber] = useState(0)

    return (
        <AuthContext.Provider value={{number}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


