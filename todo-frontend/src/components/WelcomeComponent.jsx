import { useParams, Link } from 'react-router-dom';


function WelcomeComponent() {

    // const params = useParams()
    const { username } = useParams()
    console.log(username)

    return (
        <div className="WelcomeComponent">
            <h1> Welcome {username}</h1>
            {/* <div> Your todos <a href="/todos"> Go Here</a></div> */}
            <div> Your todos <Link to="/todos"> Go Here</Link></div>

        </div>
    )
}


export default WelcomeComponent