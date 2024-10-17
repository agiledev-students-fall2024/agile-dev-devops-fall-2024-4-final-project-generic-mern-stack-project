import React from 'react';
import '../styles/Blogpostloggedin.css';

const Blogpostloggedin = () => {
  return (
    <div className="blog-post">
      <header className="blog-post-header">
        <button className="back-button">&#8592; Blog Post</button>
        <button className="edit-button">Edit Blog Post</button>
      </header>

      <div className="blog-post-image">
        <p>Image</p>
      </div>

      <div className="blog-post-content">
        <h1>Best Restaurants in NYC</h1>
        <p className="author">by John Roberts</p>
        <p className="date">October 3, 2023</p>

        <p className="content">
          New York City, a bustling metropolis renowned for its vibrant culture, iconic skyline, and, most importantly, its diverse culinary landscape, offers an endless array of dining experiences. From the historic eateries of Lower Manhattan to the innovative kitchens sprouting up in Brooklyn, every borough presents a unique taste and ambiance. Whether you're a foodie in search of cutting-edge gastronomic trends or someone craving the comfort of traditional dishes, NYC's restaurant scene has something to offer everyone.
        </p>
      </div>
    </div>
  );
};

export default Blogpostloggedin;
