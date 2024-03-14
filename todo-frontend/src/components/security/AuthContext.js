//create a context


import { createContext, useState } from "react";

export const AuthContext = createContext()




//2. share the created context with other components

//auth provider will provide context to other components

function AuthProvider({children}){

    //put some values state in the context
    const [number, setNumber] = useState(0)


    return (
        <AuthContext.Provider value={{number}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


