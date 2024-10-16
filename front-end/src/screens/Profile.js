import React from 'react'
import '../styles/profile.css'
import { useParams, Link } from 'react-router-dom'
import userData from '../fillerData/users.json'
import { Container } from 'react-bootstrap'

const Profile = () => {
    const { username } = useParams()
    const user = userData.find(user => user.username === username);

    if (!user) {
        return <h2>User not found</h2>;
    }

    return (
        <div>
            <header>
                <Link to='/'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
                        <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
                    </svg>
                </Link>
                <Link to='/' className='btn btn-secondary rounded-pill'>New Post</Link>
            </header>
            <Container className='content'>
                <h1>{user.name}</h1>
                <div className='default-img'>
                    {
                    user.profilePicture ? 
                    <img src={user.profilePicture} alt={`${user.username}'s profile`} />:
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-person-circle' viewBox='0 0 16 16'>
                        <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0'/>
                        <path fillRule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'/>
                    </svg>
                    }
                </div>

                <p>{user.bio}</p>

                <div className='profile-functions mb-4'>
                    <Link to={`/profile/${user.username}/edit`} className='btn btn-secondary rounded-pill'>Edit profile</Link>
                    <Link to='/' className='btn btn-secondary rounded-pill'>Friends</Link>
                </div>

                <hr />
            </Container>
        </div>
    )
}

export default Profile
