

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Profile.css';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
    const [profileData, setProfileData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBiteBuddyProfileData = async () => {
          try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/user`, { params: { userId } });
            
            console.log(response.data); // Log the response data
            setProfileData(response.data); // Set the profile data
          } catch (error) {
            console.error('Error fetching BiteBuddy profile data:', error);
          }
        };
      
        fetchBiteBuddyProfileData();
      }, []);

    function goToSignupProfile() {
        navigate('/signup-profile');
    }

    function signOut() {
        localStorage.removeItem('token')
        navigate('/login');
    }
    
    return (
        <>
            <h1 className='title'>Profile</h1>
            <div className='profileDiv'>
                <h2>{profileData.first_name} {profileData.last_name}</h2>
                <img className='profile-pic' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-pic" />

                <div className='bioSection'>
                    <h3>About {profileData.first_name}</h3>
                    <p>{profileData.bio}</p>
                </div>

                <div className='profileSection'>
                    <p><strong>Age:</strong> {profileData.age}</p>
                    <p><strong>Location:</strong> {profileData.location}</p>
                </div>

                <button className='profile-button' type="button" onClick={goToSignupProfile}>Edit Profile</button>
                <Link to ="/progress-tracker"><button className='profile-button' type="button">View Progress</button></Link>
                <button className='profile-button' type="button" onClick={signOut}>Sign Out</button>
            </div>
        </>
    );
}

export default Profile;