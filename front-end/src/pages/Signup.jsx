import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useState, useEffect } from 'react';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    // useEffect(() => {
    //     const checkSession = async () => {
    //         try {
    //             const currentPath = window.location.pathname;
    //             const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/check-session`, {
    //                 params: { path: currentPath }
    //             });

    //             if (response.data.redirect === '/home') {
    //                 navigate('/home');
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };

    //     checkSession();
    // }, [navigate]);

    async function goToSignUpProfile(e) {
        e.preventDefault();

        if (username.length < 8) {
            setError("Username must be at least 8 characters");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_PORT}/api/signup`, { username, password, email });
            console.log(response.data.message);
            navigate('/signup-profile');
        } catch (err) {
            setError(err.response?.data.message || 'Signup failed');
            console.error(err);
        }
        
    }

    return (
        <>
            <h1 className='title'>Bite Buddy</h1>
            <div className='registerDiv'>
                <h2>Sign Up Today!</h2>

                {error && <p className="error">{error}</p>}
                <form onSubmit={goToSignUpProfile}>
                    <label>
                        Enter Email:
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Enter Username:
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Enter Password:
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Sign Up!</button>
                </form>
                <a className='alternative' href='/login'>Log in</a>
            </div>
        </>
    );
}

export default Signup;