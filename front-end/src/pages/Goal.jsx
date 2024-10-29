// import { Link } from 'react-router-dom'
import GoalForm from './GoalForm';
import React, { useState } from 'react';
import './Goal.css'
const Goal = props => {
    const [showForm, setShowForm] = useState(false);
    const handleClick = () => {
        // implementation details
    };
    const handleClick1 = () => {
        <link rel="calculator" href="https://maniruzzamanakash.github.io/react-calculator" />
    };
    const handleClick2 = () => {
        // implementation details
    };

    return (
        <main className="Goal">
            <h1>Goals</h1>
            <div className="grid-container">
                <div className="grid-item1">
            <div>
                <button type="button" className="button" onClick={handleClick}>
                    Share a Goal
                </button>
            </div>
            </div>
            <div className="grid-item2">
            <div>
            <a href=" https://maniruzzamanakash.github.io/react-calculator/" target="_blank">
            <button type="button" className="button" onClick={handleClick1}>
                    What-If Calculator
                </button>
      </a>
      </div>
      </div>
     
      <div className="grid-item3">
        <h2>Create New Goal</h2>
            <GoalForm />
            </div>
            </div>
           
           
        </main>

    )
}



export default Goal
