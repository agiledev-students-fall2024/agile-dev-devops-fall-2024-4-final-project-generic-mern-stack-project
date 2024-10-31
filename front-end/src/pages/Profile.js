import axios from 'axios'
import React, { useState, useEffect } from "react";
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
        Promise.all([
            axios("https://my.api.mockaroo.com/users.json?key=3ac6ebb0"),
            axios("https://my.api.mockaroo.com/posts.json?key=3ac6ebb0"),
            axios("https://my.api.mockaroo.com/community.json?key=a42e4cd0"),
        ])
        .then(([userResponse, postsResponse, communityResponse]) => {
            const userData = userResponse.data[0]; 

            const updatedPosts = postsResponse.data.map(post => ({
                ...post,
                name: userData.name,           
                userName: userData.userName,   
                profilePic: userData.profilePic 
            }));
            setUser({ ...userData, posts: updatedPosts, communities: communityResponse.data, signedIn: true });
        })
        .catch(err => {
            console.error("Error fetching data:", err);
        });
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
                    {user.communities.map(item => (
                        <div key={item.id}>
                            <TitleAndDescriptionBox
                                link={`/community/${item.id}`}
                                title={item.name}
                                description={item.description}
                            />
                        </div>
                    ))}
                </section>
            )}
            {onBlogs && (
                <section className="flex flex-col justify-center w-[85%] gap-2">
                    {user.posts.map(post => (
                        <div key={post.id}>
                            <BlogPost post={post} />
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}

export default Profile;
