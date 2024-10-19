import React from 'react'
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'
import postData from '../fillerData/posts.json'
import blockedData from '../fillerData/blocked.json'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap';

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

  // pulls data of users not blocked by the user
  const posts = postData.filter(post => !blockedUsers.includes(post.author_id)).sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return (
    <div>
      <header>
        <Link to='/' className='btn btn-secondary rounded-pill'>Back</Link>
      </header>
      <Container className='content' >
        <h1>Network</h1>
        {posts.map( post => {
            const dateObject = new Date(post.date)
            return (
              // Bootstrap react card 
              <div>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={post.imageUrl} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
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

export default Explore