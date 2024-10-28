// C6, C4, C11, C12      //Issue with Blog post hold it off for now. fix monday. 
import React from 'react';
import BlogPost from '../components/BlogPost'; 
import DropdownMenu from '../components/DropdownMenu';
import NavigationBar from '../components/NavigationBar';
import SearchBar from '../components/SearchBar';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home-container">
            <SearchBar />
            <DropdownMenu 
                name="your-communities" 
                label="Your Communities" 
                options={['Community 1', 'Community 2', 'Community 3']} 
            />
            <div className="blog-posts">
                <BlogPost title="First Blog Post" content="This is the content of the first blog post." />
                <BlogPost title="Second Blog Post" content="This is the content of the second blog post." />
            </div>
            <NavigationBar />
        </div>
    );
};

export default Home;