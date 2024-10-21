import '../index.css'
import { useNavigate } from 'react-router-dom';

function Profile(){

    const navigate = useNavigate();
    function goToProfileSetup(){
        navigate('/profileSetup')
      }

    return(
        <>
            <h1 className='title'>Bite Buddy</h1>
            <div className='registerDiv'>
            <h2>Alexander Hamilton</h2>
            <h3>Bio</h3>
            
            
            <label>Email<input type="email" placeholder="alexander@gmail.com"  /></label>
            <label>Last Name<input type="text" placeholder="Username"  /></label>
            <label>Last Name<input type="text" placeholder="Username"  /></label>
            <label>Enter Password: <input type="password" placeholder="Password"/></label>
            <button type="submit">Edit Profile</button>
            
            <a className='alternative' href='/login'>Log in</a>
        
            </div>
        </>

    );
}

export default Profile