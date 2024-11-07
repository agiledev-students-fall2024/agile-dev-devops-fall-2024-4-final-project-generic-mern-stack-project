import '../styles/Home.css'
import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  // state variables
  const [user, setUser] = React.useState(null)
  const [posts, setPosts] = React.useState([])

  // fetch data from back end
  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/main`);
            console.log(response.data)
            setUser(response.data.user)
            setPosts(response.data.posts)
        } catch (error) {

        }
    };
    fetchData();
  }, [])

  const noImgSrc = 'https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg'

  return (
    user? 
    <div className='homeScreen'>
      <header>
        <Link to='/explore' className='bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline'>Explore</Link>
        <Link to= {`/profile/${user.username}`} className='bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline'>Profile</Link>
      </header>
      <div>
        <h1>Network</h1>
      </div>
      <div className={`home-posts layout`} >
        {posts.map( post => {
          const dateObject = new Date(post.date)
          return (
            <Link 
                key={`home-${user.username}-${post.id}`} 
                to={`/blogpostloggedin/${post.id}`} 
                className=' text-reset text-decoration-none'
            >
              <div>
                { post.imageUrl ? 
                    <img src={post.imageUrl} alt='User-submitted' />: 
                    <img src={noImgSrc} alt='Not provided by user' className='no-img' />
                }
                <h2>{post.title}</h2>
                <p className='post-content'>{post.content.split(' ').slice(0, 10).join(' ') + (post.content.split(' ').length > 10 ? '...' : '')}</p>
                <p className='mt-3 mb-0 text-end'>{dateObject.toLocaleDateString('en-US')}</p>
              </div>
            </Link>
        )})}
      </div>
    </div>: <div></div>

  )
}

export default Home

