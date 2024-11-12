// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Createnewblogpost.css';

// const CreateBlogPost = () => {
//   // State for form data
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);

//   // Handle form submissions
//   const handlePostBlog = () => {
//     console.log('Post blog:', { title, content, image });
//   };

//   // Handle file input
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div className="create-blog-post">
//       <header className="blog-post-header">
//         <Link to={`/profile/${username}`}>
//           <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
//             <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
//           </svg>
//         </Link>
//       </header>


//       <h1>New Blog Post</h1>

//       <div className="form-group">
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           placeholder="Title..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="image">Upload an Image</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="content">Post Content</label>
//         <textarea
//           id="content"
//           placeholder="Post Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       <button className="post-button" onClick={handlePostBlog}>Post Blog</button>
//     </div>
//   );
// };

// export default CreateBlogPost;






// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import '../styles/Createnewblogpost.css';

// const CreateBlogPost = () => {
//   const { username } = useParams(); // Use username from URL to create back link

//   // State for form data
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);

//   // Handle form submissions
//   const handlePostBlog = () => {
//     console.log('Post blog:', { title, content, image });
//   };

//   // Handle file input
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div className="create-blog-post">
//       <header className="blog-post-header">
//       <Link to={`/profile/${username}`}>
//         <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
//           <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
//         </svg>
//       </Link>
//       </header>

//       <h1>New Blog Post</h1>

//       <div className="form-group">
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           placeholder="Title..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="image">Upload an Image</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="content">Post Content</label>
//         <textarea
//           id="content"
//           placeholder="Post Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       <button className="post-button" onClick={handlePostBlog}>Post Blog</button>
//     </div>
//   );
// };

// export default CreateBlogPost;




// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios'; // Import axios
// import '../styles/Createnewblogpost.css';

// const CreateBlogPost = () => {
//   const { username } = useParams(); // Use username from URL to create back link

//   // State for form data
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);

//   // Handle form submissions
//   const handlePostBlog = async () => {
//     try {
//       const formData = {
//         title,
//         content,
//         imageUrl: image ? URL.createObjectURL(image) : ''
//       };

//       const response = await axios.post('http://localhost:3000/api/posts/create', formData);
//       console.log('Post created successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };

//   // Handle file input
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div className="create-blog-post">
//       <header className="blog-post-header">
//         <Link to={`/profile/${username}`}>
//           <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
//             <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
//           </svg>
//         </Link>
//       </header>

//       <h1>New Blog Post</h1>

//       <div className="form-group">
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           placeholder="Title..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="image">Upload an Image</label>
//         <input
//           type="file"
//           id="image"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="content">Post Content</label>
//         <textarea
//           id="content"
//           placeholder="Post Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       <button className="post-button" onClick={handlePostBlog}>Post Blog</button>
//     </div>
//   );
// };

// export default CreateBlogPost;


import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../styles/Createnewblogpost.css';
const apiUrl = process.env.REACT_APP_API_URL

const CreateBlogPost = () => {
  const { username } = useParams(); // Use username from URL to create back link

  // State for form data
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  // Handle form submissions
  const handlePostBlog = async () => {
    try {
      const formData = {
        title,
        content,
        imageUrl: image ? URL.createObjectURL(image) : ''
      };

      const response = await axios.post(`${apiUrl}/api/posts/create`, formData);
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Handle file input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="create-blog-post">
      <header className="blog-post-header">
        <Link to={`/profile/${username}`}>
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='currentColor' className='bi bi-arrow-left-short' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'/>
          </svg>
        </Link>
      </header>

      <h1>New Blog Post</h1>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Upload an Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Post Content</label>
        <textarea
          id="content"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button className="post-button" onClick={handlePostBlog}>Post Blog</button>
    </div>
  );
};

export default CreateBlogPost;
