import '../index.css'
import { useNavigate } from 'react-router-dom';

function Profile(){

    const navigate = useNavigate();
    function goToSignupProfile(){
        navigate('/signup-profile')
      }

    return(
        <>
            <h1 className='title'>Bite Buddy</h1>
            <div className='registerDiv'>
                <h2>Alexander Hamilton</h2>
                <img src="https://picsum.photos/100" alt="profile-pic"></img>
                <h3>Bio</h3>
                <p>
                    Alexander Hamilton is an American statesman who loves freedom and caviar.
                </p>
                <p>
                    Age: 35
                </p>
                <p>
                    Location: United States
                </p>
                <button type="button" onClick={goToSignupProfile}>Edit Profile</button>
            </div>
        </>
    );
}

export default Profile