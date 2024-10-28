import React from 'react'
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'
import postData from '../fillerData/posts.json'
import friendsData from '../fillerData/friendships.json'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
  // get user  
  const user = userData.find(user => user.id === loggedInData[0].id)

  // function to find friends of the user
  const findFriends = () =>{
    
    //friends of user are defined based on numbers, which get stored in friends
    const friends = []
    
    // finding friendship relationships
    for (const friendships of friendsData){
      if (friendships.user_id_1 === user.id){
        friends.push(friendships.user_id_2)
      }
      else if (friendships.user_id_2 === user.id){
        friends.push(friendships.user_id_1)
      }
    }
    
    // function returns the friends array
    return friends
  }

  // friends calls the findFriends function
  const friends = findFriends()

  // pulls data of friends
  const posts = postData.filter(post => friends.includes(post.author_id)).sort((a, b) => new Date(b.date) - new Date(a.date))
  const noImgSrc = 'https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg'

  return (
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
    </div>
  )
}

export default Home

