import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    function goToSignUpProfile(event) {
        event.preventDefault(); // Prevent default form submission
        console.log('going');
        navigate('/signup-profile');
    }

    return (
        <>
            <h1 className='title'>Bite Buddy</h1>
            <div className='registerDiv'>
                <h2>Sign Up Today!</h2>
                
                <form onSubmit={goToSignUpProfile}>
                    <label>
                        Enter Email:
                        <input type="email" placeholder="Email" required />
                    </label>
                    <label>
                        Enter Username:
                        <input type="text" placeholder="Username" required />
                    </label>
                    <label>
                        Enter Password:
                        <input type="password" placeholder="Password" required />
                    </label>
                    <button type="submit">Sign Up!</button>
                </form>
                <a className='alternative' href='/login'>Log in</a>
            </div>
        </>
    );
}

export default Signup;