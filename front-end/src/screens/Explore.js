import React from 'react'
import userData from '../fillerData/users.json'
import loggedInData from '../fillerData/loggedIn.json'
import postData from '../fillerData/posts.json'
import blockedData from '../fillerData/blocked.json'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import '../styles/Home.css'

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
  
  return (
    <div>
      <header>
      <Link to='/'>
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
              <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
          </svg>
      </Link>
      </header>
      <Container className='content' >
        <h1>Network</h1>
        {posts.map( post => {
            const dateObject = new Date(post.date)
            return (
              // Bootstrap react card 
              <div key={`explore-${post.id}`}>
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

export default Explore