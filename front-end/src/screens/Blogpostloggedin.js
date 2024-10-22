// import React from 'react';
// import '../styles/Blogpostloggedin.css';

// const Blogpostloggedin = () => {
//   return (
//     <div className="blog-post">
//       <header className="blog-post-header">
//         <button className="back-button">&#8592; Blog Post</button>
//         <button className="edit-button">Edit Blog Post</button>
//       </header>

//       <div className="blog-post-image">
//         <p>Image</p>
//       </div>

//       <div className="blog-post-content">
//         <h1>Best Restaurants in NYC</h1>
//         <p className="author">by John Roberts</p>
//         <p className="date">October 3, 2023</p>

//         <p className="content">
//           New York City, a bustling metropolis renowned for its vibrant culture, iconic skyline, and, most importantly, its diverse culinary landscape, offers an endless array of dining experiences. From the historic eateries of Lower Manhattan to the innovative kitchens sprouting up in Brooklyn, every borough presents a unique taste and ambiance. Whether you're a foodie in search of cutting-edge gastronomic trends or someone craving the comfort of traditional dishes, NYC's restaurant scene has something to offer everyone.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Blogpostloggedin;





import '../styles/Blogpostloggedin.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import postData from '../fillerData/posts.json';
import userData from '../fillerData/users.json';

const BlogPostLoggedIn = () => {
  const { postId } = useParams(); // Use post ID from URL to get specific post data
  const post = postData.find(post => post.id === parseInt(postId));

  if (!post) {
    return <p>Post not found</p>;
  }

  // Find author details from users.json using author_id from post
  const author = userData.find(user => user.id === post.author_id);

  const dateObject = new Date(post.date);

  return (
    <div className="blog-post-container">
      <header className="blog-post-header">
        <Link to="/">
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
          </svg>
        </Link>
        <Link to={`/updateblogpost/${postId}`}>
          <button className="btn btn-secondary rounded-pill">Edit</button>
        </Link>      
        </header>
      
      <div className="blog-post-content">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt="Post Image" className="blog-post-image" />
        ) : (
          <img src="https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg" alt="Not provided by user" className="blog-post-image no-img" />
        )}

        <div className="blog-post-details">
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="author-name">by {author ? author.name : "Unknown Author"}</p>
          <p className="post-date">{dateObject.toLocaleDateString('en-US')}</p>
          <p className="post-content">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostLoggedIn;

