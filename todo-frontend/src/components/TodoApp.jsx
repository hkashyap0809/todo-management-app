import { useState } from 'react'
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            
            <LoginComponent />
            {/* <WelcomeComponent /> */}
        </div>
    )
}

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setErrorMessage] = useState(false)

    function handleUsernameChange(event){
        // console.log(event.target.value)
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        // console.log(event.target.value)
        setPassword(event.target.value)
    }

    function handleSubmit(event){
        // console.log(`${username}-${password}`)
        if( username === 'harshit' && password === 'qwerty'){
            setShowSuccessMessage(true);
            setErrorMessage(false);
        }else{
            setShowSuccessMessage(false);
            setErrorMessage(true);
        }
    }

    function SuccessMessageComponent(){
        if(showSuccessMessage){
            return <div className="successMessage" > Authenticated Successfully </div>
        }
        return null
    }
    
    function ErrorMessageComponent(){
        if(showErrorMessage)
            return <div className="errorMessage" > Authentication Failed. Please check your credentials </div>
        return null
    }


    return (
        <div className="Login>">
            
            <SuccessMessageComponent />
                <ErrorMessageComponent />
            <div className="LoginForm">
                <div>
                    <label> User Name </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>

                <div>
                    <label> Password </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>
                        LOGIN
                    </button>
                </div>

            </div>
        </div>
    )
}


function WelcomeComponent() {
    return (
        <div className="Welcome">
            Welcome Component
        </div>
    )
}


