import React, { useState, useEffect } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

// Blog post component
const BlogPost = () => {
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState("");

  // Load the post data
  useEffect(() => {
    // Mock data for the post
    setPost({
      profilePic: "seraphim-logo.png",
      name: "John Doe",
      userName: "johndoe",
      text: "This is an example post.",
      images: ["seraphim-logo.png", "seraphim-logo.png"],
      replies: [],
      likes: 500,
    });
  }, []);

  const handleReplySubmit = () => {
    if (newReply.trim()) {
      setReplies([...replies, newReply]);
      setNewReply("");
    }
  };

  const handleReplyCancel = () => {
    setShowReplies(false);
  };

  const toggleLike = () => {
    setLiked(!liked);
    setPost((prev) => ({
      ...prev,
      likes: liked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const formatLikes = (likes) => {
    return likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes;
  };

  return (
    <div className="w-[100%] px-4 py-2 bg-lavender_blush-900 rounded-lg shadow-md shadow-ebony-900">
      <div className="flex flex-row items-center">
        <img src={post.profilePic} alt="Profile" className="w-32 h-32 rounded-md" />
        <p className="flex flex-col justify-start items-center text-md">
          <span className="font-bold text-ebony">{post.name}</span>
          <span className="text-rose opacity-[75%]">@{post.userName}</span>
        </p>
      </div>

      <div className="w-[95%] m-auto text-lg text-ebony">{post.text}</div>

      {post.images && post.images.length === 1 ? (
        <img
          src={post.images[0]}
          alt="Post"
          className="w-[95%] h-auto rounded-md m-auto mt-3 bg-ebony-800"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 w-[95%] m-auto mt-3">
          {post.images && post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post image ${index + 1}`}
              className="w-full h-48 rounded-md object-cover bg-ebony-800"
            />
          ))}
        </div>
      )}

      <div className="w-[95%] flex flex-row justify-end items-center gap-8">
        <button onClick={toggleLike} className="mt-4 flex flex-row items-center gap-2 text-rose">
          {liked ? (
            <FcLike size="32" style={{ filter: "brightness(0) saturate(100%) invert(99%) sepia(60%) saturate(6174%) hue-rotate(284deg) brightness(101%) contrast(102%)" }} />
          ) : (
            <FcLikePlaceholder size="32" style={{ filter: "brightness(0) saturate(100%) invert(96%) sepia(51%) saturate(944%) hue-rotate(284deg) brightness(105%) contrast(104%)" }} />
          )}
          <div>
            <span className="font-bold text-lg">{formatLikes(post.likes)}</span> Hearts
          </div>
        </button>
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="mt-4 text-ebony"
        >
          <span className="font-bold text-lg">{replies.length}</span> Replies
        </button>
      </div>

      {showReplies && (
        <div className="mt-4">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write a reply..."
            className="border-[1px] border-rose p-2 w-full rounded-md bg-transparent placeholder-ebony-700 text-ebony"
          />
          <div className="flex flex-row gap-2">
            <button
                onClick={handleReplySubmit}
                className="mt-2 bg-rose text-lavender_blush-900 py-1 px-4 rounded-md hover:bg-ebony"
            >
                Post Reply
            </button>
            <button
                onClick={handleReplyCancel}
                className="mt-2 bg-transparent text-ebony border-[1px] border-ebony py-1 px-4 rounded-md hover:text-rose hover:border-rose"
            >
                Cancel
            </button>
          </div>
          {replies.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold text-ebony">Replies</h3>
              {replies.map((reply, index) => (
                <div key={index} className="mt-2 text-ebony pl-4 border-l-2">
                  {reply}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPost;
