// Home.js
import React, { useState } from 'react';
import BlogPost from '../components/BlogPost';
import DropdownMenu from '../components/DropdownMenu';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        console.log(`Searching for: ${searchInput}`);
    };

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
                <BlogPost /> {/* This now uses BlogPost's internal data handling */}
            </div>

            
        </div>
    );
};

export default Home;
