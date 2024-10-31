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
        const initialUser = {
            name: 'John Doe',
            userName: 'johndoe',
            about: ['hi i am john doe', 'i live in nyc, ny', 'i like cats', 'i am in lots of communities:', 'arts', 'music', 'emo music'],
            posts: [{
                id: 1,
                profilePic: "seraphim-logo.PNG",
                name: "John Doe",
                userName: "johndoe",
                text: "Exploring new ideas for my latest project. Thoughts?",
                images: [],
                replies: ["Exciting stuff!", "Looking forward to this!"],
                likes: 725,
              },
              
              {
                id: 2,
                profilePic: "seraphim-logo.PNG",
                name: "John Doe",
                userName: "johndoe",
                text: "Just finished a long week. Time to relax and recharge!",
                images: ["seraphim-logo.PNG"],
                replies: ["You deserve it!", "Enjoy your break!"],
                likes: 350,
              },
              
              {
                id: 3,
                profilePic: "seraphim-logo.PNG",
                name: "John Doe",
                userName: "johndoe",
                text: "Sharing some highlights from the past year. Feeling grateful.",
                images: ["seraphim-logo.PNG", "seraphim-logo.PNG"],
                replies: ["Great moments!", "So inspiring to see this."],
                likes: 910,
              },
              
              {
                id: 4,
                profilePic: "seraphim-logo.PNG",
                name: "John Doe",
                userName: "johndoe",
                text: "Here's a sneak peek at something I'm working on! Stay tuned.",
                images: ["seraphim-logo.PNG", "seraphim-logo.PNG"],
                replies: ["Can't wait!", "Looks awesome already!"],
                likes: 630,
              },
              
              {
                id: 5,
                profilePic: "seraphim-logo.PNG",
                name: "John Doe",
                userName: "johndoe",
                text: "Appreciating the small victories. Celebrate every win!",
                images: ["seraphim-logo.PNG"],
                replies: ["Absolutely!", "Well said!"],
                likes: 480,
              }
            ],
            communities: [
                {
                    id: 1,
                    name: "Youth Empowerment Group",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                },
                {
                    id: 2,
                    name: "The Local Circle",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                },
                {
                    id: 3,
                    name: "Positivity Hub",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                },
                {
                    id: 4,
                    name: "Artistic Voices",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                },
                {
                    id: 5,
                    name: "Movie Enthusiasts",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                }
            ],
            profilePic: 'seraphim-logo.PNG',
            signedIn: false,
            followers: 0 
        };
        setUser(initialUser);
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
