// // import '../styles/Blogpostloggedin.css';
// // import React from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import postData from '../fillerData/posts.json';
// // import userData from '../fillerData/users.json';
// // import loggedInData from '../fillerData/loggedIn.json'; // Import logged-in user data
// // const apiUrl = process.env.REACT_APP_API_URL;

// // const BlogPostLoggedIn = () => {
// //   const { postId } = useParams(); // Use post ID from URL to get specific post data
// //   const post = postData.find(post => post.id === parseInt(postId));

// //   if (!post) {
// //     return <p>Post not found</p>;
// //   }

// //   // Find author details from users.json using author_id from post
// //   const author = userData.find(user => user.id === post.author_id);
// //   const loggedInUser = loggedInData[0]; // Get the logged-in user details

// //   const dateObject = new Date(post.date);

// //   return (
// //     <div className="blog-post-container">
// //       <header className="blog-post-header">
// //         <Link to="/">
// //           <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
// //             <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
// //           </svg>
// //         </Link>

// //         {/* Show edit button only if logged-in user is the author of the post */}
// //         {author && loggedInUser && author.id === loggedInUser.id && (
// //           <Link to={`/updateblogpost/${postId}`}>
// //             <button className="bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline">Edit</button>
// //           </Link>
// //         )}
// //       </header>
      
// //       <div className="blog-post-content">
// //         {post.imageUrl ? (
// //           <img src={post.imageUrl} alt="Post Image" className="blog-post-image" />
// //         ) : (
// //           <img src="https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg" alt="Not provided by user" className="blog-post-image no-img" />
// //         )}

// //         <div className="blog-post-details">
// //           <h1 className="blog-post-title">{post.title}</h1>
// //           <p className="author-name">
// //             by {author ? (
// //               <Link to={`/profile/${author.username}`}>
// //                 {author.name}
// //               </Link>
// //             ) : (
// //               "Unknown Author"
// //             )}
// //           </p>
// //           <p className="post-date">{dateObject.toLocaleDateString('en-US')}</p>
// //           <p className="post-content">{post.content}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BlogPostLoggedIn;



import '../styles/Blogpostloggedin.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postData from '../fillerData/posts.json';
import userData from '../fillerData/users.json';
import loggedInData from '../fillerData/loggedIn.json'; // Import logged-in user data
// const apiUrl = process.env.REACT_APP_API_URL;

const BlogPostLoggedIn = () => {
  const { postId } = useParams(); // Use post ID from URL to get specific post data
  const post = postData.find(post => post.id === parseInt(postId));

  if (!post) {
    return <p>Post not found</p>;
  }

  // Find author details from users.json using author_id from post
  const author = userData.find(user => user.id === post.author_id);
  const loggedInUser = loggedInData[0]; // Get the logged-in user details

  const dateObject = new Date(post.date);

  return (
    <div className="blog-post-container">
      <header className="blog-post-header">
        <Link to="/">
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
          </svg>
        </Link>

        {/* Show edit button only if logged-in user is the author of the post */}
        {author && loggedInUser && author.id === loggedInUser.id && (
          <Link to={`/updateblogpost/${postId}`}>
            <button className="bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline">Edit</button>
          </Link>
        )}
      </header>
      
      <div className="blog-post-content">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt="Post Image" className="blog-post-image" />
        ) : (
          <img src="https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg" alt="Not provided by user" className="blog-post-image no-img" />
        )}

        <div className="blog-post-details">
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="author-name">
            by {author ? (
              <Link to={`/profile/${author.username}`}>
                {author.name}
              </Link>
            ) : (
              "Unknown Author"
            )}
          </p>
          <p className="post-date">{dateObject.toLocaleDateString('en-US')}</p>
          <p className="post-content">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostLoggedIn;


// import '../styles/Blogpostloggedin.css';
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const apiUrl = process.env.REACT_APP_API_URL;

// const BlogPostLoggedIn = () => {
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState('');
//   const { postId } = useParams();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/posts/${postId}`);
//         if (response.status === 200) {
//           setPost(response.data);
//         } else {
//           setError('Post not found');
//         }
//       } catch (error) {
//         console.error('Error fetching post:', error);
//         setError('Post not found or the server encountered an error');
//       }
//     };
//     fetchPost();
//   }, [postId]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   const dateObject = new Date(post.date);

//   return (
//     <div className="blog-post-container">
//       <header className="blog-post-header">
//         <Link to="/">
//           <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
//             <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
//           </svg>
//         </Link>

//         {/* Show edit button only if logged-in user is the author of the post */}
//         {post.author && post.loggedInUser && post.author.id === post.loggedInUser.id && (
//           <Link to={`/updateblogpost/${postId}`}>
//             <button className="bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline">Edit</button>
//           </Link>
//         )}
//       </header>

//       <div className="blog-post-content">
//         {post.imageUrl ? (
//           <img src={post.imageUrl} alt="Post Image" className="blog-post-image" />
//         ) : (
//           <img src="https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg" alt="Not provided by user" className="blog-post-image no-img" />
//         )}

//         <div className="blog-post-details">
//           <h1 className="blog-post-title">{post.title}</h1>
//           <p className="author-name">
//             by {post.author ? (
//               <Link to={`/profile/${post.author.username}`}>
//                 {post.author.name}
//               </Link>
//             ) : (
//               "Unknown Author"
//             )}
//           </p>
//           <p className="post-date">{dateObject.toLocaleDateString('en-US')}</p>
//           <p className="post-content">{post.content}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPostLoggedIn;
