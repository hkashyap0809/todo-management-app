import { useParams } from "react-router-dom";
import { retrieveTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik,Form } from "formik";

function TodoComponent(){

    const {id} = useParams()
    const username = useAuth().username;

    const [description , setDescription] = useState()
    const [targetDate , setTargetDate] = useState()
    
    useEffect(
        () => retrieveTodo(),
        [id]
    )

    function retrieveTodo(){
        retrieveTodoApi(username,id)
        .then((response) => {
            console.log(response.data)
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
        })
        .catch()
    }

    function onSubmit(values){
        console.log(values)
    }


    return (
        <div className="container">
            <h1> Enter todo details</h1>
            <div>
                <Formik initialValues={{description:description,targetDate}}
                enableReinitialize="true"
                onSubmit = {onSubmit}
                >
                    {
                    (props) => (
                        <Form>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div> 
                                <button className="btn btn-success m-5" type="submit"> Save </button>
                            </div>
                        </Form>

                    )

                }

                </Formik>
            </div>

        </div>
    )
}

export default TodoComponent;