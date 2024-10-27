import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <p>
        Visit the <Link to="/balances">Balance Page</Link> to view your balances and debt
      </p>
    </div>
    
  );
}

export default Home;
