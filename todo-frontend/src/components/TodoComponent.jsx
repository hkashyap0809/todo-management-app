import { useParams } from "react-router-dom";
import { retrieveTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";

function TodoComponent(){

    const {id} = useParams()
    const username = useAuth().username;

    const [description , setDescription] = useState()
    
    
    useEffect(
        () => retrieveTodo(),
        [id]
    )



    function retrieveTodo(){
        retrieveTodoApi(username,id)
        .then((response) => {
                setDescription(response.data.description)
        })
        .catch()
    }
    return (
        <div className="container">
            <h1> Enter todo details</h1>
            <div>
                description : { description }
            </div>

        </div>
    )
}

export default TodoComponent;