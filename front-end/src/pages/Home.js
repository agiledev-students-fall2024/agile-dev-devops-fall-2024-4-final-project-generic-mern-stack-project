import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import DropdownMenu from '../components/DropdownMenu';
import SearchBar from '../components/SearchBar';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);
    const location = useLocation();

    const handleSearch = () => {
        console.log(`Searching for: ${searchInput}`);
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/home`)
            .then(response => {
                const initialPosts = response.data;
                
                // Check if a new post was added through the navigation state
                const newPost = location.state?.newPost;
                if (newPost) {
                    setPosts([newPost, ...initialPosts]); // Add the new post to the top of the post list
                } else {
                    setPosts(initialPosts);
                }
            })
            .catch(err => {
                console.log("Failed to fetch posts.");
                console.error(err);
            });
    }, [location.state]);

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
                        <BlogPost post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

