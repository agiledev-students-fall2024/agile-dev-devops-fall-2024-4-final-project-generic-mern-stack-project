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
            
            
            <label>Last Name<input type="text" placeholder="Alexander"  /></label>
            <label>Last Name<input type="text" placeholder="Hamilton"  /></label>
            <label>Email<input type="email" placeholder="alexander@gmail.com"  /></label>
            <label>Password<input type="password" placeholder="**************"/></label>
            <button type="submit">Edit Profile</button>
        
            </div>
        </>

    );
}

export default Profile