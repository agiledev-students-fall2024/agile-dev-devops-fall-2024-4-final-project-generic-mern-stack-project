import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import BlogPost from "../components/BlogPost";
import TitleAndDescriptionBox from "../components/TitleAndDescriptionBox";

const Profile = (props) => {
    const [user, setUser] = useState({
        name: '',
        userName: '',
        about: [],
        posts: [],
        communities: [],
        profilePic: '',
        signedIn: false,
        followers: 0
    });
    const [hasFollowed, setHasFollowed] = useState(false); 
    const [onCommunities, setOnCommunities] = useState(true);
    const [onBlogs, setOnBlogs] = useState(false);

    useEffect(() => {
        axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/profile`)
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(`Error fetching data.`)
                console.error(err)
            })
    }, []);

    const handleFollow = () => {
        setUser((prevUser) => ({
            ...prevUser,
            followers: prevUser.followers + (hasFollowed ? -1 : 1)
        }));
        setHasFollowed(!hasFollowed); 
    };

    const toggleCommunities = () => {
        setOnCommunities(true);
        setOnBlogs(false);
    };

    const toggleBlogs = () => {
        setOnCommunities(false);
        setOnBlogs(true);
    };

    return (
        <div className="w-[90%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
            <ProfileHeader 
                user={user}
                loggedIn={user.signedIn} 
                onFollow={handleFollow} 
                hasFollowed={hasFollowed} 
                toggleBlogs={toggleBlogs}
                toggleCommunities={toggleCommunities}
            />
            {onCommunities && (
                <section className="flex flex-col justify-center w-[100%] sm:w-[95%] gap-0">
                    {user.communities.length > 0 ? (
                        user.communities.map(item => (
                            <div key={item.id}>
                                <TitleAndDescriptionBox
                                    link={`/community/${item.id}`}
                                    title={item.name}
                                    description={item.description}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="m-auto bg-lavender_blush-900 w-[70%] p-8 rounded-lg text-center text-lg text-ebony font-semibold shadow-md shadow-[#fedae7]">
                            Find your place and join a community today <Link to="/community" className="text-rose text-bold hover:underline hover:text-rose">here</Link>
                            <hr className="border-none"></hr>
                            You can also form your own community <Link to="/create-community" className="text-rose text-bold hover:underline hover:text-rose">here</Link>
                        </div>
                    )}
                </section>
            )}
            {onBlogs && (
                <section className="flex flex-col justify-center w-[85%] gap-2">
                    {user.posts.length > 0 ? (
                        user.posts.map(post => (
                        <div key={post.id}>
                            <BlogPost post={post} />
                        </div>
                        ))
                    ) : (
                        <div className="m-auto bg-lavender_blush-900 w-[70%] p-8 rounded-lg text-center text-lg text-ebony font-semibold shadow-md shadow-[#fedae7]">
                            Make your first post and connect with others <Link to="/post" className="text-rose text-bold hover:underline hover:text-rose">here</Link>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default Profile;
