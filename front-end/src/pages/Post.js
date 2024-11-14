import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PostBlogTextField from '../components/PostBlogTextField';
import './Post.css';

const Post = () => {
    const navigate = useNavigate();
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

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    const handlePost = (postContent, selectedOption) => {
        console.log("Posted:", postContent, "Community:", selectedOption);

        const newPost = {
            id: Date.now(), 
            user: user,
            content: postContent,
            liked_by: [],
            likes: 0,
            images: [],
            replies: []
        };

        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/post`, { postContent: newPost, selectedOption })
        .then(response => {
            console.log(response.data);
            navigate("/", { state: { newPost } });
        })
        .catch(err => {
            console.error("Error posting data:", err);
        });
    };

    return (
        <div className="post-page-container">
            <PostBlogTextField onCancel={handleCancel} onPost={handlePost} />
        </div>
    );
};

export default Post;




