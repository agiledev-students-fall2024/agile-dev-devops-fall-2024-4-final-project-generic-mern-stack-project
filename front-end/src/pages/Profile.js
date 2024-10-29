import { useState } from 'react'
import BlogPost from "../components/BlogPost"

const Profile = (props) => {

    return (
        <div className="w-[90%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
            <BlogPost />
        </div>
    )
}

export default Profile