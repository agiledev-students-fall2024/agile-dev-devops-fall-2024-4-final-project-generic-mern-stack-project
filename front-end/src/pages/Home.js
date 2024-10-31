// Home.js
import React, { useState } from 'react';
import BlogPost from '../components/BlogPost';
import DropdownMenu from '../components/DropdownMenu';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        console.log(`Searching for: ${searchInput}`);
    };

    const posts = [{
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
    ];

    return (
        <div className="w-[100%] flex flex-col justify-center items-center gap-6 p-8 mx-auto md:w-[90%]">
            <SearchBar 
                searchInput={searchInput} 
                setSearchInput={setSearchInput} 
                handleSearch={handleSearch} 
            />
            
            <DropdownMenu 
                name="communitySelect" 
                label="Select a Community" 
                options={['Community 1', 'Community 2', 'Community 3']} 
            />
            
            <div className="w-[100%] flex flex-col gap-4 md:w-[80%] lg:w-[70%]">
                {posts.map(post => (
                    <div key={post.id}>
                        <BlogPost
                            post={post}
                        />
                    </div> 
                ))}
            </div>

            
        </div>
    );
};

export default Home;
