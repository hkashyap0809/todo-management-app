import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL:"http://localhost:8080"
    }
)
export const retreiveAllTodosForUsernameApi = (username) => apiClient.get(`/users/${username}/todos`,{
    headers:{
        // Authorization:'Basic YWRtaW46YWRtaW4='
    }
})

export const deleteTodoApi = (username,id) => apiClient.delete(`/users/${username}/todos/${id}`)

export const retrieveTodoApi = (username,id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoAPi = (username,id,todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)


export const createTodoApi = (username, todo) => apiClient.post(`/users/${username}/todos`,todo)

