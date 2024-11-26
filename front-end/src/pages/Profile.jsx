// import '../Profile.css'
// import { useNavigate } from 'react-router-dom';

// function Profile(){

//     const navigate = useNavigate();
//     function goToSignupProfile(){
//         navigate('/signup-profile')
//       }

//     return(
//         <>
//             <h1 className='title'>Bite Buddy Profile Card</h1>
//             <div className='profileDiv'>
//                 <h2>Alexander Hamilton</h2>
//                 <img className='profile-pic' src="https://picsum.photos/100" alt="profile-pic" />

//                 <div className='bioSection'>
//                     <h3>Bio</h3>
//                     <p>Alexander Hamilton is an American statesman who loves freedom and caviar.</p>
//                 </div>

//                 <div className='profileSection'>
//                     <p>Age: 35</p>
//                     <p>Location: United States</p>
//                 </div>

//                 <button type="button" onClick={goToSignupProfile}>Edit Profile</button>
//             </div>
//         </>
//     );
// }

// export default Profile

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Profile.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBiteBuddyProfileData = async () => {
            try{
            const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/biteBuddyProfile`);
            const fetchedData = response.data[0];
            console.log("fetched data console log:" + fetchedData);
            console.log("fetched age:" + fetchedData.age);

            setProfileData(fetchedData);
            }
            catch(error){
                console.error('Error bite buddy profile data: ', error)
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

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className='title'>Profile</h1>
            <div className='profileDiv'>
                <h2>{profileData.first_name} {profileData.last_name}</h2>
                <img className='profile-pic' src="https://picsum.photos/100" alt="profile-pic" />

                <div className='bioSection'>
                    <h3>About {profileData.first_name}</h3>
                    <p>{profileData.bio}</p>
                </div>

                <div className='profileSection'>
                    <p><strong>Age:</strong> {profileData.age}</p>
                    <p><strong>Location:</strong> {profileData.location}</p>
                </div>

                <button type="button" onClick={goToSignupProfile}>Edit Profile</button>
                <div style={{ margin: '10px 0' }}></div>
                <button type="button" onClick={signOut}>Sign Out</button>
            </div>
        </>
    );
}

export default Profile;