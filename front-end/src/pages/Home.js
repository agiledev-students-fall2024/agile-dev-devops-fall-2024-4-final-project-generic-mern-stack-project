import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import BlogPost from '../components/BlogPost';
import DropdownMenu from '../components/DropdownMenu';
import SearchBar from '../components/SearchBar';
import { ColorContext } from '../ColorContext';
import { FontContext } from '../FontContext';

const Home = () => {
    const { updateColor } = useContext(ColorContext);
    const { updateFont } = useContext(FontContext);

    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState("Select a Community");

    const handleSearch = () => {
        console.log(`Searching for: ${searchInput}`);
    };

    const handleCommunityChange = (event) => {
        setSelectedCommunity(event.target.value);
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

        axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/color-mode`)
            .then(response => {
                updateColor(response.data.toLowerCase())
            })
            .catch(err => {
                console.log(`Could not get data.`)
                console.error(err)
            })

        axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/font-size`)
            .then(response => {
                updateFont(response.data)
            })
            .catch(err => {
                console.log(`Could not get data.`)
                console.error(err)
            })
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
                label={selectedCommunity}
                options={['Community 1', 'Community 2', 'Community 3']}
                handleChange={handleCommunityChange}
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
