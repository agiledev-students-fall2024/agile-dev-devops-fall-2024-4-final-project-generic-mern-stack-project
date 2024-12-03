import React, { useState } from "react";
import "./PostBlogTextField.css";
import DropdownMenu from "./DropdownMenu";

const PostBlogTextField = ({ onCancel, onPost, communities }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [attachedImage, setAttachedImage] = useState(null);

  const handlePostClick = () => {
    if (onPost) {
      onPost(postContent, selectedOption, attachedImage);
    }
    setPostContent("");
    setSelectedOption("");
    setAttachedImage(null);
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
    setPostContent("");
    setSelectedOption("");
    setAttachedImage(null);
  };

  const handleAttachImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedImage(file);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="post-blog-container">
      <div className="header">
        <button onClick={handleCancelClick}>Cancel</button>
        <button onClick={handlePostClick}>Post</button>
      </div>
      <DropdownMenu
        name="your-communities"
        label="Your Communities"
        options={communities}
        onChange={handleDropdownChange}
        value={selectedOption}
      />
      <textarea
        placeholder="Write your post here..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      {attachedImage && (
        <img
          src={URL.createObjectURL(attachedImage)}
          alt="Attached"
          className="attached-image"
        />
      )}
      <div className="footer">
        <label htmlFor="attach-image" className="attach-button">
          Attach Image
          <input
            type="file"
            id="attach-image"
            onChange={handleAttachImage}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

export default PostBlogTextField;

