import '../index.css'
import { useNavigate } from 'react-router-dom';


function Signup(){
    const navigate = useNavigate();
    function goToLogin(){
        navigate('/login')
      }
    return (
        <>
        
            <h1 className='title'>Bite Buddy</h1>
            <div className='registerDiv'>
            <h2>Sign Up Today!</h2>
            
            <form>
                <label>Enter Email:<input type="email" placeholder="Email"  /></label>
                <label>Enter Username: <input type="text" placeholder="Username"  /></label>
                <label>Enter Password: <input type="password" placeholder="Password"/></label>
                <button type="submit">Register</button>
            </form>
            <a className='alternative' href='/login'>Log in</a>
        
            </div>
        </>
      );

}

export default Signup