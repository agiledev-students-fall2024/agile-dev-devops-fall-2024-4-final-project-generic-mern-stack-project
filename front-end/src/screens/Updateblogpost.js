// import React, { useState } from 'react';
// import '../styles/Updateblogpost.css';

// const Updateblogpost = () => {
//   const [title, setTitle] = useState('Best Restaurants in NYC');
//   const [content, setContent] = useState(
//     "New York City, a bustling metropolis renowned for its vibrant culture, iconic skyline, and, most importantly, its diverse culinary landscape, offers an endless array of dining experiences. From the historic eateries of Lower Manhattan to the innovative kitchens sprouting up in Brooklyn, every borough presents a unique taste and ambiance. Whether you're a foodie in search of cutting-edge gastronomic trends or someone craving the comfort of traditional dishes, NYC's restaurant scene has something to offer everyone.\n\nFor those who cherish history as much as a good meal, classic establishments like Katz's Delicatessen in Manhattan are a must-visit. Operating since 1888, Katz's serves up arguably the best pastrami sandwich in the city."
//   );
//   const [image, setImage] = useState(null);

//   // Handle form submissions
//   const handleUpdateBlog = () => {
//     console.log('Update blog:', { title, content, image });
//   };

//   // Handle file input
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div className="update-blog-post">
//       <header className="update-blog-post-header">
//         <button className="back-button">&#8592; Edit Blog Post</button>
//         <button className="update-button" onClick={handleUpdateBlog}>Update Blog Post</button>
//       </header>

//       <div className="form-group">
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="image">Upload New Image</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="content">Edit Post Content</label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Updateblogpost;






// import '../styles/Updateblogpost.css';
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import postData from '../fillerData/posts.json';
// import userData from '../fillerData/users.json';

// const UpdateBlogPost = () => {
//   const { postId } = useParams(); // Extract the post ID from the URL
//   const [post, setPost] = useState(null);
//   const [author, setAuthor] = useState(null);

//   useEffect(() => {
//     // Find the post by ID
//     const foundPost = postData.find((post) => post.id === parseInt(postId));
//     setPost(foundPost);

//     // Find the author of the post using author_id
//     if (foundPost) {
//       const foundAuthor = userData.find((user) => user.id === foundPost.author_id);
//       setAuthor(foundAuthor);
//     }
//   }, [postId]);

//   if (!post) {
//     return <p>Post not found</p>;
//   }

//   return (
//     <div className="update-blog-post-container">
//       <header className="update-blog-post-header">
//         <Link to={`/blogpostloggedin/${postId}`}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="32"
//             height="32"
//             fill="currentColor"
//             className="bi bi-arrow-left-short"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
//             />
//           </svg>
//         </Link>
        
//       </header>

//       <form className="update-blog-post-form">
//         <div className="form-group">
//           <label htmlFor="postTitle">Title:</label>
//           <input
//             type="text"
//             id="postTitle"
//             value={post.title}
//             onChange={(e) => setPost({ ...post, title: e.target.value })}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="postAuthor">Author:</label>
//           <input
//             type="text"
//             id="postAuthor"
//             value={author ? author.name : "Unknown Author"}
//             disabled
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="postContent">Content:</label>
//           <textarea
//             id="postContent"
//             value={post.content}
//             onChange={(e) => setPost({ ...post, content: e.target.value })}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="postDate">Date:</label>
//           <input
//             type="text"
//             id="postDate"
//             value={new Date(post.date).toLocaleDateString('en-US')}
//             disabled
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="postImageUrl">Image URL:</label>
//           <input
//             type="text"
//             id="postImageUrl"
//             value={post.imageUrl}
//             onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
//           />
//         </div>

//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateBlogPost;







// import '../styles/Updateblogpost.css';
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios'; // Import axios

// const UpdateBlogPost = () => {
//   const { postId } = useParams(); // Extract the post ID from the URL
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     // Fetch the post by ID from the backend
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
//         setPost(response.data);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   const handleUpdateBlog = async () => {
//     try {
//       const updatedData = {
//         title: post.title,
//         content: post.content,
//         imageUrl: post.imageUrl
//       };

//       const response = await axios.put(`http://localhost:3000/api/posts/edit/${postId}`, updatedData);
//       console.log('Post updated successfully:', response.data);
//     } catch (error) {
//       console.error('Error updating post:', error);
//     }
//   };

//   if (!post) {
//     return <p>Post not found</p>;
//   }

//   return (
//     <div className="update-blog-post-container">
//       <header className="update-blog-post-header">
//         <Link to={`/blogpostloggedin/${postId}`}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="32"
//             height="32"
//             fill="currentColor"
//             className="bi bi-arrow-left-short"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
//             />
//           </svg>
//         </Link>
//       </header>

//       <form className="update-blog-post-form" onSubmit={(e) => {
//         e.preventDefault();
//         handleUpdateBlog();
//       }}>
//         <div className="form-group">
//           <label htmlFor="postTitle">Title:</label>
//           <input
//             type="text"
//             id="postTitle"
//             value={post.title}
//             onChange={(e) => setPost({ ...post, title: e.target.value })}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="postContent">Content:</label>
//           <textarea
//             id="postContent"
//             value={post.content}
//             onChange={(e) => setPost({ ...post, content: e.target.value })}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="postImageUrl">Image URL:</label>
//           <input
//             type="text"
//             id="postImageUrl"
//             value={post.imageUrl}
//             onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
//           />
//         </div>

//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateBlogPost;


import '../styles/Updateblogpost.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
const apiUrl = process.env.REACT_APP_API_URL


const UpdateBlogPost = () => {
  const { postId } = useParams(); // Extract the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the post by ID from the backend
    const fetchPost = async () => {
      try {
        const response = await axios.put(`${apiUrl}/api/posts/edit/${postId}`, updatedData);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUpdateBlog = async () => {
    try {
      const updatedData = {
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl
      };

      const response = await axios.put(`http://localhost:3000/api/posts/edit/${postId}`, updatedData);
      console.log('Post updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="update-blog-post-container">
      <header className="update-blog-post-header">
        <Link to={`/blogpostloggedin/${postId}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
        </Link>
      </header>

      <form className="update-blog-post-form" onSubmit={(e) => {
        e.preventDefault();
        handleUpdateBlog();
      }}>
        <div className="form-group">
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            id="postTitle"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postImageUrl">Image URL:</label>
          <input
            type="text"
            id="postImageUrl"
            value={post.imageUrl}
            onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateBlogPost;
