import { useEffect, useState } from "react";
import { retreiveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService";

function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])
    const [message,setMessage] = useState();   
    const authContext =   

    // useEffect is a hook to tell React that the component needs to do something after render
    useEffect(
        () => refreshTodos(),[]
    )

    function refreshTodos() {

        retreiveAllTodosForUsernameApi('harshit')
            .then((response) => {                
                setTodos(response.data)
            })
            .catch((error) => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi('harshit',id)
        .then(
            //display message
            //update todos list

            () => {
                setMessage(`Delete of todo with id : ${id} successful`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
        console.log(`Delete Todo id ${id}`)
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
                            </tr>
                        )}
                </tbody>
            </table>

        </div>
    )
}

export default ListTodosComponent;