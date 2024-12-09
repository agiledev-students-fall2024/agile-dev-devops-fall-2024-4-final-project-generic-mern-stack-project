import '../styles/Home.css';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/authContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const { logout, token } = React.useContext(AuthContext);

  // State variables
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState(null);

  // Fetch data from the back-end
  React.useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get(`${apiUrl}/api/main`, {
          headers: { Authorization: `Bearer ${token}` }, // Send JWT token
        });
        setUser(response.data.user);
        setPosts(response.data.posts);
      } catch (err) {
        console.error('API Error:', err); // Log the error
        setError('Failed to load data. Please try again.');
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  const noImgSrc =
    'https://cdn.vectorstock.com/i/500p/50/20/no-photography-sign-image-vector-23665020.jpg';

  return user ? (
    <div className="homeScreen">
      <header>
        <Link
          to="/explore"
          className="bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline"
        >
          Explore
        </Link>
        <button
          className="bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline"
          onClick={logout}
        >
          Logout
        </button>
        <Link
          to={`/profile/${user.username}`}
          className="bg-gray-500 text-white text-base py-2 px-4 rounded-full no-underline"
        >
          Profile
        </Link>
      </header>
      <div>
        <h1>Network</h1>
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className={`home-posts layout`}>
          {posts.map((post) => {
            const dateObject = new Date(post.createdAt); // Use `createdAt` from the back-end
            return (
              <Link
                key={`home-${user.username}-${post._id}`} // Use `_id` for consistency with MongoDB
                to={`/blogpostloggedin/${post._id}`}
                className="text-reset text-decoration-none"
              >
                <div>
                  {post.photo ? (
                    <img
                      src={post.photo}
                      alt="User-submitted"
                      className="post-image"
                    />
                  ) : (
                    <img
                      src={noImgSrc}
                      alt="Not provided by user"
                      className="no-img"
                    />
                  )}
                  <h2>{post.title}</h2>
                  <p className="post-content">
                    {post.content.trim().split(' ').slice(0, 20).join(' ') +
                      (post.content.split(' ').length > 20 ? '...' : '')}
                  </p>
                  <h3 className="authorName">by {post.name}</h3> 
                  <p className="postDate">
                    {dateObject.toLocaleDateString('en-US')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;