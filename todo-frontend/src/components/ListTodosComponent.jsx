function ListTodosComponent() {

    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())

    const todos = [
        { id: 1, description: "DISTRIBUTED SYSTEM PROJECT", done: false, targetDate: targetDate },
        { id: 2, description: "POIS PROJECT", done: false, targetDate: targetDate },
        { id: 3, description: "UIUDP PROJECT", done: true, targetDate: targetDate },
    ]

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
                                <td> {todo.targetDate.toDateString()}</td>
                            </tr>
                        )}
                </tbody>
            </table>

        </div>
    )
}

export default ListTodosComponent;