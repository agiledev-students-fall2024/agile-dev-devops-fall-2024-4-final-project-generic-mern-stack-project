import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostBlogTextField from "../components/PostBlogTextField";
import "./Post.css";
import { axiosInstance } from "../axios";

const Post = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/profile`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(`Error fetching user data.`);
        console.error(err);
      });

    axiosInstance
      .get(`/user-communities`)
      .then((response) => {
        setCommunities(response.data.communities);
      })
      .catch((err) => {
        console.log("Failed to fetch user's communities.");
        console.error(err);
      });
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePost = (postContent, selectedCommunityId, attachedImage) => {
    if (!selectedCommunityId) {
      alert("Please select a community.");
      return;
    }

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("community", selectedCommunityId);
    if (attachedImage) {
      formData.append("file", attachedImage);
    }

    axiosInstance
      .post(`/post`, formData)
      .then((response) => {
        console.log(response.data);
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error posting data:", err);
      });
  };

  return (
    <div className="post-page-container">
      {user && (
        <PostBlogTextField
          onCancel={handleCancel}
          onPost={handlePost}
          communities={communities}
        />
      )}
    </div>
  );
};

export default Post;




