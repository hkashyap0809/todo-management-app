import { useEffect, useState } from "react";
import { retreiveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])
    const [message,setMessage] = useState();   
    const authContext = useAuth();
    const username = authContext.username;

    const navigate = useNavigate()


    // useEffect is a hook to tell React that the component needs to do something after render
    useEffect(
        () => refreshTodos(),[]
    )

    function refreshTodos() {

        retreiveAllTodosForUsernameApi(username)
            .then((response) => {                
                setTodos(response.data)
            })
            .catch((error) => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(username,id)
        .then(
            //display message
            //update todos list

            () => {
                console.log(authContext)
                setMessage(`Delete of todo with id : ${id} successful`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
        console.log(`Delete Todo id ${id}`)
    }

    function updateTodo(id){
        console.log(`Update todo ${id}`)
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
    }

    return (
        <div className="container">
            <h1>Things to do</h1>
            {message && <div className="alert alert-warning"> {message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th> IS DONE</th>
                        <th> TARGET DATE</th>
                        <th> Delete </th>
                        <th> Update </th>

                    </tr>
                </thead>

                <tbody>
                    {
                        todos.map(
                            todo => <tr key={todo.id}>

                                <td> {todo.description}</td>
                                <td> {todo.done.toString()}</td>
                                <td> {todo.targetDate.toString()}</td>
                                <td> <button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}> X </button></td>
                                <td> <button className="btn btn-success" onClick={() => updateTodo(todo.id)}> O </button></td>
                            </tr>
                        )}
                </tbody>
            </table>
            <div className="btn btn-success m-5" onClick={addNewTodo}> ADD TODO</div>

        </div>
    )
}

export default ListTodosComponent;