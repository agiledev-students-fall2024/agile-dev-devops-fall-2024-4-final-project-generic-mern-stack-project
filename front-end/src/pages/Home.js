// C6, C4, C11, C12      //Issue with Blog post hold it off for now. fix monday. 
import React, { useState } from 'react';
import BlogPost from '../components/BlogPost';
import DropdownMenu from '../components/DropdownMenu';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import './Home.css';

const Home = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        console.log(`Searching for: ${searchInput}`);
    };

    // Mock data for BlogPost component
    const mockBlogPosts = [
        {
            user: {
                profilePic: "/path/to/profilePic1.png",
                name: "Alice Johnson",
                userName: "@alicejohnson",
            },
            text: "Exploring the beauty of nature through photography. Join me!",
            images: ["/path/to/image1.png"],
        },
        {
            user: {
                profilePic: "/path/to/profilePic2.png",
                name: "Bob Smith",
                userName: "@bobsmith",
            },
            text: "Top 10 tips for staying productive in remote work.",
            images: ["/path/to/image2.png", "/path/to/image3.png"],
        },
    ];

    return (
        <div className="home-container">
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
            
            <div className="blog-posts">
                {mockBlogPosts.map((post, index) => (
                    <BlogPost 
                        key={index}
                        User={post.user}
                        text={post.text}
                        images={post.images}
                    />
                ))}
            </div>

            <NavigationBar />
        </div>
    );
};

export default Home;
