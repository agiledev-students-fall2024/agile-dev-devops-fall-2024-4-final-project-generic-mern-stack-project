import React from 'react'
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'
import postData from '../fillerData/posts.json'
import friendsData from '../fillerData/friendships.json'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Home = () => {
  
  const user = userData.find(user => user.id === loggedInData[0].id)

  const findFriends = () =>{
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

    return friends
  }

  const friends = findFriends()
  
  // pulls data of friends
  const posts = postData.filter(post => friends.includes(post.author_id)).sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return (
    <div>
      <header>
        <Link to='/explore' className='btn btn-secondary rounded-pill'>Explore</Link>
        <Link to= {`/profile/${user.username}`} className='btn btn-secondary rounded-pill'>Profile</Link>
      </header>
      <Container className='content' >
        <h1>Network</h1>
        
      </Container>
    </div>
  )
}

export default Home
