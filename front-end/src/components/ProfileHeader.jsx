import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileHeader = ({ user, loggedIn, onFollow, hasFollowed, toggleBlogs, toggleCommunities }) => {
    const [profileUser, setProfileUser] = useState({});
    const [profileLoggedIn, setProfileLoggedIn] = useState(false);

    useEffect(() => {
        setProfileUser(user);
        setProfileLoggedIn(loggedIn);
    }, [user, loggedIn]);

    return (
        <div className="flex flex-col justify-center items-center border-none rounded-xl p-4 w-full md:w-4/5 m-auto bg-lavender_blush-900 shadow-md shadow-[#fedae7] min-h-[300px]">
            <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
                {profileUser.profilePic && (
                    <img
                        className="w-[35%] md:w-[30%] border-none rounded-full shadow-sm shadow-[#fedae7] bg-ebony-800"
                        src={profileUser.profilePic}
                        alt="Profile"
                    />
                )}
                <div className="w-[90%] md:w-[60%] flex flex-col">
                    {profileLoggedIn ? (
                        <div className="w-full flex justify-between items-center">
                            <p className="flex gap-2 text-xs sm:text-sm md:text-md pl-2">
                                <span className="font-bold text-ebony">{user.name}</span>
                                <span className="text-rose opacity-75">@{user.userName}</span>
                            </p>
                            <Link to="/settings">
                                <div className="py-1 px-2 mb-1 border border-rose text-rose rounded-md hover:border-ebony hover:text-ebony text-xs md:text-sm">
                                    Settings
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="w-full flex justify-between items-center">
                            <p className="flex gap-2 text-xs sm:text-sm md:text-md pl-2">
                                <span className="font-bold text-ebony">{user.name}</span>
                                <span className="text-rose opacity-75">@{user.userName}</span>
                            </p>
                            <button
                                className={`py-1 px-2 mb-1 border rounded-md text-xs md:text-sm ${
                                    hasFollowed ? "bg-rose text-lavender_blush-900 font-bold border-rose" : "border-rose text-rose hover:border-ebony hover:text-ebony"
                                }`}
                                onClick={onFollow}
                            >
                                {hasFollowed ? "Following" : "Follow"}
                            </button>
                        </div>
                    )}

                    <div className="w-full h-auto flex flex-col justify-evenly px-4 py-2 rounded-md shadow-md gap-1">
                        {profileUser.about && profileUser.about.map((info, index) => (
                            <p key={index} className="text-xs md:text-sm lg:text-md">{info}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full mt-6 flex flex-col sm:flex-row justify-evenly items-center border-t border-rose-800 text-md text-rose">
                <button 
                    onClick={toggleCommunities} 
                    className="w-full sm:w-auto pt-2 px-4 sm:px-12 border-b sm:border-b-0 border-rose-800 hover:text-ebony transition duration-200 ease-in-out"
                >
                    Communities
                </button>
                <button 
                    onClick={toggleBlogs} 
                    className="w-full sm:w-auto pt-2 px-4 sm:px-12 hover:text-ebony transition duration-200 ease-in-out"
                >
                    Blogs
                </button>
            </div>
        </div>
    );
}

export default ProfileHeader;
