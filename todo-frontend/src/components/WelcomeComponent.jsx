import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';


function WelcomeComponent() {

    // const params = useParams()
    const { username } = useParams()

    const [message, setMessage] =  useState(null);

    function callHelloWorldRESTAPI(){
    
        retrieveHelloWorldPathVariable(username)
        .then( (response) =>  successResponse(response))
        .catch( (error) => errorResponse(error))
        .finally( () => console.log('cleanup') )
    }


    function successResponse(response){
        // console.log(response);
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error);
    }

    return (
        <div className="WelcomeComponent">
            <h1> Welcome {username}</h1>
            {/* <div> Your todos <a href="/todos"> Go Here</a></div> */}
            <div> Your todos <Link to="/todos"> Go Here</Link></div>
            <div className="btn btn-success m-5" onClick={callHelloWorldRESTAPI}> Call Hello World </div>
            <div className="text-info"> DATA :  {message}</div>
        </div>
        
    )
}


export default WelcomeComponent