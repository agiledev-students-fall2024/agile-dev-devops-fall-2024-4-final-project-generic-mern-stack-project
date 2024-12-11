import '../styles/Profile.css'
import '../styles/main.css'
import React from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'


const apiUrl = process.env.REACT_APP_API_URL;

const Profile = () => {
    const { username } = useParams()
    const token = localStorage.getItem('token')
    const [user, setUser] = React.useState(null)
    const [belongsToLoggedIn, setBelongsToLoggedIn] = React.useState(null)
    const [posts, setPosts] = React.useState([])
    const [rel, setRel] = React.useState('')
    const [reqId, setReqId] = React.useState(null)
    const navigate = useNavigate(); 

    const generateRandomList = (min, max, count) => (
        Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
    )

    React.useEffect(() => {
        axios
            .get(`${apiUrl}/api/account/user/${username}`, 
                { headers: { Authorization: `Bearer ${token}` }, }
            )
            .then(res => {
                setBelongsToLoggedIn(res.data.belongsToLoggedIn)
                setUser(res.data.user)
                setPosts(res.data.posts)
                setRel(res.data.rel)
                setReqId(res.data.reqId)
            })
            .catch(err => {
                navigate('/')
            })
    }, [token, username, rel, navigate])

    
    const randomNumbers = generateRandomList(6, 13, posts.length)

    const renderPosts = () => {
        const noImgSrc = 'https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg' 

        if (user.layout === 'list-title'){
            return (
                <div className={`profile-posts layout--${user.layout}`}>
                    { posts.map( post => {
                        const dateObject = new Date(post.createdAt)
                        return (
                            <Link 
                                key={`profile-${user.username}-${post._id}`} 
                                to={`/blogpostloggedin/${post._id}`} 
                                className=' text-reset text-decoration-none'
                            >                                
                                <div>
                                    <h2>{post.title}</h2>
                                    <p className='mt-3 mb-0 text-end'>{dateObject.toLocaleDateString('en-US')}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )
        } else if (user.layout === 'grid'){
            return (
                <div className={`profile-posts layout--${user.layout}`}>
                    { posts.map( post => {
                        return (
                            <Link 
                                key={`profile-${user.username}-${post._id}`} 
                                to={`/blogpostloggedin/${post._id}`} 
                                className='text-reset text-decoration-none'
                            >
                                { post.photo ? 
                                    <img 
                                        src={post.photo} 
                                        alt='User-submitted' />: 
                                    <img 
                                        src={noImgSrc}
                                        alt='Not provided by user'
                                        className='no-img' />
                                }
                            </Link>
                        )
                    })}
                </div>
            )
        } else if (user.layout === 'masonry-title'){
            return (
                <div className='profile-posts layout--masonry mt-8'>
                    { posts.map( (post, index) => {
                        const dateObject = new Date(post.createdAt)
                        return (
                            <Link 
                                key={`profile-${user.username}-${post._id}`} 
                                to={`/blogpostloggedin/${post._id}`} 
                                className='text-reset text-decoration-none'
                            >   
                                <div>
                                    { post.photo ? 
                                        <img 
                                            src={post.photo} 
                                            alt='User-submitted' 
                                            style={{'--masonry-img-height': `${randomNumbers[index]}rem`}} />: 
                                        <img 
                                            src={noImgSrc}
                                            alt='Not provided by user'
                                            className='no-img' 
                                            style={{'--masonry-img-height': `${randomNumbers[index]}rem`}} />
                                    }
                                    <h2>{post.title}</h2>
                                    <p className='mt-3 mb-0 text-end'>{dateObject.toLocaleDateString('en-US')}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )
        } else if (user.layout === 'masonry'){
            return (
                <div className='profile-posts layout--masonry masonry-img'>
                    { posts.map( (post, index) => (
                        <Link 
                            key={`profile-${user.username}-${post._id}`} 
                            to={`/blogpostloggedin/${post._id}`} 
                            className=' text-reset text-decoration-none'
                        >
                            { post.photo ? 
                                <img 
                                    src={post.photo} 
                                    alt='User-submitted' 
                                    style={{'--masonry-img-height': `${randomNumbers[index]}rem`}} />: 
                                <img 
                                    src={noImgSrc}
                                    alt='Not provided by user' 
                                    className='no-img' 
                                    style={{'--masonry-img-height': `${randomNumbers[index]}rem`}} />
                            }
                        </Link>
                    ))}
                </div>
            )
        } else {
            return (
                <div className='profile-posts layout'>
                    {posts.map( post => {
                        const dateObject = new Date(post.createdAt)
                        return (
                            <Link 
                                key={`profile-${user.username}-${post._id}`} 
                                to={`/blogpostloggedin/${post._id}`} 
                                className=' text-reset text-decoration-none'
                            >
                                <div>
                                    { post.photo ? 
                                        <img src={post.photo} alt='User-submitted' />: 
                                        <img src={noImgSrc} alt='Not provided by user' className='no-img' />
                                    }
                                    <h2>{post.title}</h2>
                                    <p className='mt-3 mb-0 text-end'>{dateObject.toLocaleDateString('en-US')}</p>
                                </div>
                            </Link>
                    )})}
                </div>
            )
        }
    }

    const handleAddFriend = async () => {
        try {
            await axios.post(`${apiUrl}/api/friends/request/${user._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRel('OUTGOING')
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    const handleRemoveFriend = async () => {
        try {
            await axios.post(`${apiUrl}/api/friends/remove/${user._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            })
            setRel('NONE')
        } catch (error) {
          console.error('Error:', error);
        }
    }

    const handleCancelRequest = async () => {
        try {
            await axios.post(`${apiUrl}/api/friends/requests/cancel/${reqId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRel('NONE')
        } catch (error) {
          console.error('Error canceling friend request:', error);
        }
    };

    const handleAcceptRequest = async () => {
        try {
            await axios.post(`${apiUrl}/api/friends/requests/accept/${reqId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRel('FRIENDS')
        } catch (error) {
          console.error('Error canceling friend request:', error);
        }
    };

    const handleDeclineRequest = async () => {
        try {
            await axios.post(`${apiUrl}/api/friends/requests/decline/${reqId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRel('NONE')
        } catch (error) {
          console.error('Error canceling friend request:', error);
        }
    };

    const handleBlock = async () => {
        try {
            await axios.post(`${apiUrl}/api/friends/block/${user._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/friendsblocked'); 
        } catch (error) {
          console.error('Error canceling friend request:', error);
        }
    };

    const ActionButton = ({ onClick, className, children }) => (
        <button className={`${className} text-white text-base py-2 px-4 rounded-full no-underline`} onClick={onClick}>
            {children}
        </button>
    );

    return (
        <div>
            <header>
                <Link to='/' >
                    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
                        <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
                    </svg>
                </Link>
                
                {   
                    belongsToLoggedIn ? 
                    <Link to={`/createnewblogpost/${user.username}`} className='bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline'>New Post</Link> :
                    <>
                        {rel === 'FRIENDS' && (
                            <div>
                                <ActionButton className="bg-gray-400 me-3" onClick={handleRemoveFriend}>Remove Friend</ActionButton>
                                <ActionButton className="bg-red-500" onClick={handleBlock}>Block</ActionButton>
                            </div>
                        )}

                        {rel === 'INCOMING' && (
                            <div>
                                <ActionButton className="bg-green-700 me-3" onClick={handleAcceptRequest}>Accept Request</ActionButton>
                                <ActionButton className="bg-red-500" onClick={handleDeclineRequest}>Decline Request</ActionButton>
                            </div>
                        )}

                        {rel === 'OUTGOING' && (
                            <ActionButton className="bg-gray-400" onClick={handleCancelRequest}>Cancel Request</ActionButton>
                        )}

                        {rel === 'NONE' && (
                            <div>
                                <ActionButton className="bg-blue-500 me-3" onClick={handleAddFriend}>Add Friend</ActionButton>
                                <ActionButton className="bg-red-500" onClick={handleBlock}>Block</ActionButton>
                            </div>
                        )}
                    </>              
                }
            </header>

            { user && <>
                <div className='container content' id='profile-blog-posts'>
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
                        {belongsToLoggedIn && <Link to='/edit-profile' className='bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline'>Edit profile</Link>}
                        {belongsToLoggedIn && <Link to='/friendslist' className='bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline'>Friends</Link>}
                    </div>
                </div>
                <div className='mx-3 mb-5'>
                    <hr/>
                    { 
                        posts.length !== 0 ?
                        renderPosts():
                        <p className='text-center mt-5'>No posts yet</p>
                    }
                </div>
            </> }
        </div>
    )
}

export default Profile
