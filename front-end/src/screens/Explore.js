import React from 'react'
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'
import postData from '../fillerData/posts.json'
import blockedData from '../fillerData/blocked.json'
import { Link } from 'react-router-dom'
import '../styles/Explore.css'

const Explore = () => {
  // get user id 
  const user = userData.find(user => user.id === loggedInData[0].id)

  // function to find blocked relationships of the user
  const findBlocked = () =>{
    
    // blocked users by user are defined based on numbers, which get stored in blockedUsers
    const blockedUsers = []
    
    // finding blocked relationships
    for (const blocked of blockedData){
      if (blocked.blocked_id_1 === user.id){
        blockedUsers.push(blocked.blocked_id_2)
      }
      else if (blocked.blocked_id_2 === user.id){
        blockedUsers.push(blocked.blocked_id_1)
      }
    }

    // function returns the blockedUsers array
    return blockedUsers
  }

  // blockedUsers calls the findBlocked function
  const blockedUsers = findBlocked()

  // do not include the loggedin user's own posts
  blockedUsers.push(user.id)

  // pulls data of users not blocked by the user
  const posts = postData.filter(post => !blockedUsers.includes(post.author_id)).sort((a, b) => new Date(b.date) - new Date(a.date))
  const noImgSrc = 'https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg'
  
  return (
    <div>
      <header>
      <Link to='/' className='ms-auto'>
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'/>
          </svg>
      </Link>
      </header>
      <div>
        <h1>Explore</h1>
      </div>
      <div className={`explore-posts layout`} >
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

export default Explore