import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// blog post component
const BlogPost = props => {
    const [user, setUser] = useState({})

    // need use effect that immediately populates user for us
    // we also need reply button and wings button

    return
    (<div>
        <img src={user.profilePic}></img>  
        <div>
            <p><span>{user.name}</span>{user.userName}</p>
            <div>{user.text}</div>
            {user.images &&
                user.images.map(images => (
                    <img src={images}></img>
                ))
            }
        </div>  
    </div>)
}

// export blog post
export default BlogPost