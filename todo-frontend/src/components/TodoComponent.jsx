import { useNavigate, useParams } from "react-router-dom";
import { createTodoApi, retrieveTodoApi, updateTodoAPi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import moment from "moment";

function TodoComponent() {

    const { id } = useParams()
    const username = useAuth().username;

    const [description, setDescription] = useState()
    const [targetDate, setTargetDate] = useState()

    const navigate = useNavigate();

    useEffect(
        () => retrieveTodo(),
        [id]
    )

    function retrieveTodo() {
        //retrieve todo only if id != -1
        //if id == -1, its a new todo
        if (id != -1) {
            retrieveTodoApi(username, id)
                .then((response) => {
                    console.log(response.data)
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch()
        }
    }

    function onSubmit(values) {
        console.log(values)

        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            isDone: false
        }
        if( id == -1 ){
            createTodoApi(username,todo)
            .then( response => {
                navigate("/todos")
            })
            .catch( error => console.log(error))
        }else{
        updateTodoAPi(username, id, todo)
            .then(response => {
                // console.log(response)
                navigate("/todos")
            })
            .catch(error => console.log(error))
        }
        console.log(todo)
    }

    function validate(values) {

        let errors = {
            //hard coding error value
            // description: "Enter a valid description",
            // targetDate : "Enter a valid target date"
        }
        console.log(id)
        console.log(values)
        if ( values.description === undefined ||values.description.length < 5) errors.description = "Enter atleast 5 characters"
        if (values.targetDate == null || values.targetDate == '' || moment(values.targetDate).isValid()) errors.targetDate = "Enter a target date"
        return errors

    }


    return (
        <div className="container">
            <h1> Enter todo details</h1>
            <div>
                <Formik initialValues={{ description: description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage

                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />


                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />


                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
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