import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
       <div>
            <br></br>
            <br></br>
            <h1>404 - Not Found!</h1>
            <Link to="/Homepage">Go Home</Link>
       </div> 
    );
}; 

export default NotFound;
