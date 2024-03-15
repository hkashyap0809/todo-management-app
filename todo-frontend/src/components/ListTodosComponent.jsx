import { useEffect, useState } from "react";
import { retreiveAllTodosForUsername } from "./api/TodoApiService";

function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])
    
    // useEffect is a hook to tell React that the component needs to do something after render
    useEffect(
        () => refreshTodos(),[]
    )

    function refreshTodos() {

        retreiveAllTodosForUsername('harshit')
            .then((response) => {                
                setTodos(response.data)
            })
            .catch((error) => console.log(error))
    }


    return (
        <div className="container">
            <h1>Things to do</h1>
            <table className="table">
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
                            todo => <tr key={todo.id}>

                                <td>{todo.id}</td>
                                <td> {todo.description}</td>
                                <td> {todo.done.toString()}</td>
                                <td> {todo.targetDate.toString()}</td>
                            </tr>
                        )}
                </tbody>
            </table>

        </div>
    )
}

export default ListTodosComponent;