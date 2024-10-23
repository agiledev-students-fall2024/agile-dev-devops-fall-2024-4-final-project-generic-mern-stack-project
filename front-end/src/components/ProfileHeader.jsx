import React, { useState, useEffect } from "react"

// profile header component
const ProfileHeader = ({ User, LoggedIn }) => {

    const [user, setUser] = useState({})

    // set the user as soon as this is loaded
    useEffect(() => {
        setUser(User)
    }, [])

    return (
        <div className="flex flex-column justify-evenly items-center border-2 rounded-xl p-4 w-[70%] h-max">
            <img className="w-[200px]" src={user.profilePic}></img>
            <div>
                {LoggedIn && 
                    <div>
                        <button>Edit Profile</button>
                        <button>Settings</button>
                    </div>
                }
                {user.about && 
                    user.about.map((info, index) => (
                        <p key={index}>{info}</p>
                    ))
                }
            </div>
            <div>
                <a href={user.aboutPage}/>
                <a href={user.communitiesPage}/>
                <a href={user.blogsPage}/>
            </div>  
        </div>
    )
}

// export profile header
export default ProfileHeader