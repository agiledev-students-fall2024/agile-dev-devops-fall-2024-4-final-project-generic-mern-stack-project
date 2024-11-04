import '../index.css'
import { useNavigate } from 'react-router-dom';

function Login(){

    const navigate = useNavigate();
    
    function goToHome(){
        navigate('/home')
    }

    return(<>
        <h1 className='title'>Bite Buddy</h1>
        <div className='registerDiv'>
        <h2>Login</h2>
        <form onSubmit={goToHome}>
            <label>Enter Username:<input type="text" placeholder="Username" /></label>
            <label> Enter Password:<input type="password" placeholder="Password" /></label>
            <button type="submit">Login</button>
        </form>
       
        <a className='alternative' href='/signup'>Sign Up</a>
        </div>
        </>
    );


}
export default Login