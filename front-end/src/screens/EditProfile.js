import React from 'react'
import '../styles/profile.css'
import { useParams, Link } from "react-router-dom"
import userData from '../fillerData/users.json'
import { Container } from 'react-bootstrap'
import EditProfileForm from '../components/EditProfileForm'

const EditProfile = () => {
    const { username } = useParams()
    const user = userData.find(user => user.username === username);

    if (!user) {
        return <h2>User not found</h2>;
    }

    return (
        <div>
            <header>
                <Link to={`/profile/${user.username}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                    </svg>
                </Link>
            </header>
            <Container className='content'>
                <h1>Edit Profile</h1>
                <div className='default-img'>
                    {
                    user.profilePicture ? 
                    <img src={user.profilePicture} alt={`${user.username}'s profile`} />:
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                    }
                </div>

                <p>Edit picture</p> {/* placeholder for now */}
                <EditProfileForm />
            </Container>
        </div>
    )
}

export default EditProfile
