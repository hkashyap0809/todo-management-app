
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';


function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate();

    const authContext = useAuth()

    function handleUsernameChange(event) {
        // console.log(event.target.value)
        setUsername(event.target.value)
    }
    function handlePasswordChange(event) {
        // console.log(event.target.value)
        setPassword(event.target.value)
    }

    async function handleSubmit(event) {
        if( await authContext.login(username,password) ){
            navigate(`/welcome/${username}`)
        }else{
            setErrorMessage(true)
        }
    }

    return (
        <div className="Login>">
            <h1> LOGIN </h1>
            {showErrorMessage && <div className="errorMessage" > Authentication Failed. Please check your credentials </div>}
            <div className="LoginForm">
                <div>
                    <label> User Name </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label> Password </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
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

export default LoginComponent