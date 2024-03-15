import { useParams } from "react-router-dom";
import { retrieveTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";

function TodoComponent() {

    const { id } = useParams()
    const username = useAuth().username;

    const [description, setDescription] = useState()
    const [targetDate, setTargetDate] = useState()

    useEffect(
        () => retrieveTodo(),
        [id]
    )

    function retrieveTodo() {
        retrieveTodoApi(username, id)
            .then((response) => {
                console.log(response.data)
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch()
    }

    function onSubmit(values) {
        console.log(values)
    }

    function validate(values) {

        let errors = {
            //hard coding error value
            // description: "Enter a valid description",
            // targetDate : "Enter a valid target date"
        }

        if( values.description.length < 5 ) errors.description = "Enter atleast 5 characters"
        if( values.targetDate == null ) errors.description("Enter a target date")
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
                                    conponent="div"
                                    className="alert alert-warning"
                                />


                                <ErrorMessage

                                    name="targetDate"
                                    conponent="div"
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