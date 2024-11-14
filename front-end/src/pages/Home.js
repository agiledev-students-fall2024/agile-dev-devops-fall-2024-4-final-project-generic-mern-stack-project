import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost';
import DropdownMenu from '../components/DropdownMenu';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);

    const handleSearch = () => {
        console.log(`Searching for: ${searchInput}`);
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/home`)
            .then(response => {
                setPosts(response.data.posts);
            })
            .catch(err => {
                console.log("Failed to fetch posts.");
                console.error(err);
            });
    }, []);

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
