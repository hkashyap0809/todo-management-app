import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate , useParams , Link } from 'react-router-dom';
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <BrowserRouter >
            <Routes>
                <Route path='/' element={<LoginComponent />} /> 
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/welcome/:username' element={<WelcomeComponent/>} />
                <Route path='/todos' element={<ListTodosComponent/>} />
                {/* error route should be at the last */}
                <Route path='/*' element={<ErrorComponent/>} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate();

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
            navigate(`/welcome/${username}`)
        }else{
            setShowSuccessMessage(false);
            setErrorMessage(true);
        }
    }

    return (
        <div className="Login>">
            <h1> LOGIN </h1>
            {showSuccessMessage && <div className="successMessage" > Authenticated Successfully </div>}
            {showErrorMessage && <div className="errorMessage" > Authentication Failed. Please check your credentials </div>}
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

    // const params = useParams()
    const { username } = useParams()
    console.log(username)
    
    return (
        <div className="WelcomeComponent">
            <h1> Welcome {username}</h1>
            {/* <div> Your todos <a href="/todos"> Go Here</a></div> */}
            <div> Your todos <Link to="/todos"> Go Here</Link></div>

        </div>
    )
}


function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>Error Component - NO URL EXISTS </h1>
            <div> 404 NOT FOUND</div>
        </div>
    )
}


function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay())

    const todos = [
        { id:1 , description : "DISTRIBUTED SYSTEM PROJECT", done:false , targetDate : targetDate },
        { id:2 , description : "POIS PROJECT", done:false , targetDate : targetDate },
        { id:3 , description : "UIUDP PROJECT", done:true , targetDate : targetDate },
    ]

    return (
        <div className="ListTodosComponent">
            <h1>Things to do</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>DESCRIPTION</td>
                        <td> IS DONE</td>
                        <td> TARGET DATE</td>
                    </tr>
                </thead>

                <tbody>
                    {
                    todos.map(
                        todo =>  <tr key={todo.id}> 

                                    <td>{todo.id}</td> 
                                    <td> {todo.description}</td>
                                    <td> {todo.done.toString()}</td>
                                    <td> {todo.targetDate.toDateString()}</td>
                                </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}