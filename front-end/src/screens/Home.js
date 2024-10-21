import React from 'react'
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'
import postData from '../fillerData/posts.json'
import friendsData from '../fillerData/friendships.json'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
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

  return (
    <div>
      <header>
        <Link to='/explore' className='btn btn-secondary rounded-pill'>Explore</Link>
        <Link to= {`/profile/${user.username}`} className='btn btn-secondary rounded-pill'>Profile</Link>
      </header>
      <Container className='content' >
        <h1>Network</h1>
        {posts.map( post => {
            const dateObject = new Date(post.date)
            return (
              // Bootstrap react card 
              <div key={`home-${post.id}`}>
              <Card className="card-display">
                <Card.Img variant="top" src={post.imageUrl} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {/* Display 10 words on blog home page */}
                    {post.content.split(' ').slice(0, 10).join(' ') + (post.content.split(' ').length > 10 ? '...' : '')} <br />
                    {/* Display dates of blog posts */}
                    {dateObject.toLocaleDateString('en-US')}
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
        )})}
      </Container>
    </div>
  )
}

export default Home

