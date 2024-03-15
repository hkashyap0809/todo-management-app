import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


function WelcomeComponent() {

    // const params = useParams()
    const { username } = useParams()
    console.log(username)

    function callHelloWorldRESTAPI(){
        console.log(`called`)
        axios.get("http://localhost:8080/hello-world")
        .then( 
            (response) =>   successResponse(response)
        )
        .catch(
            (error) => errorResponse(error)
        )
        .finally(
            () => console.log('cleanup')
        )

    }

    function successResponse(response){
        console.log(response);
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
        </div>
        
    )
}


export default WelcomeComponent