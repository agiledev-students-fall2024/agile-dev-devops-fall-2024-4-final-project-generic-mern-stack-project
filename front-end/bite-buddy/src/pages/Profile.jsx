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
//             <div className='registerDiv'>
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
        const mockarooUrl = 'https://my.api.mockaroo.com/bite_buddy_1.json?key=bd61d090';

        axios.get(mockarooUrl)
            .then(response => {
                console.log('API Response:', response.data);
                setProfileData(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching mock data:', error);
            });
    }, []);

    function goToSignupProfile() {
        navigate('/signup-profile');
    }

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className='title'>Profile</h1>
            <div className='registerDiv'>
                <h2>{profileData.first_name} {profileData.last_name}</h2>
                <img className='profile-pic' src="https://picsum.photos/100" alt="profile-pic" />

                <div className='bioSection'>
                    <h3>About {profileData.first_name}</h3>
                    <p>{profileData.bio}</p>
                </div>

                <div className='profileSection'>
                    <p>Age: {profileData.age}</p>
                    <p>Location: {profileData.location}</p>
                </div>

                <button type="button" onClick={goToSignupProfile}>Edit Profile</button>
            </div>
        </>
    );
}

export default Profile;