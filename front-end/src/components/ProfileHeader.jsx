import React, { useState, useEffect } from "react"

// profile header component
const ProfileHeader = ({ User, LoggedIn }) => {

    const [user, setUser] = useState({})

    // set the user as soon as this is loaded
    useEffect(() => {
        setUser(User)
    }, [User])

    return (
        <div className="flex flex-col justify-center items-center border-[none] rounded-xl p-4 w-[90%] h-[15%] m-[auto] font-sera shadow-md shadow-[#fedae7]">
            <div className="w-[100%] h-[100%] flex flex-column justify-between items-center">
                <img className="w-[45%] h-[100%] border-[none] rounded-full shadow-sm shadow-[#fedae7]" src={user.profilePic} alt="Profile"></img>
                <div className="w-[50%] h-[100%] p-2 flex flex-col justify-between">
                    {LoggedIn && 
                        <div>
                            <button>Edit Profile</button>
                            <button>Settings</button>
                        </div>
                    }
                    <div className="w-[100%] h-max text-xs flex flex-col justify-evenly p-2 border-2">
                        {user.about && 
                            user.about.map((info, index) => (
                                <p key={index}>{info}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-[100%] mt-4 flex flex-row justify-evenly items-center">
                <a href={user.aboutPage}>About</a>
                <a href={user.communitiesPage}>Communities</a>
                <a href={user.blogsPage}>Blogs</a>
            </div>  
        </div>
    )
}

// export profile header
export default ProfileHeader