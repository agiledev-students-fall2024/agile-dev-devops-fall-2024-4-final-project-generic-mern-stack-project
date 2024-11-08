// NoRecipe.jsx
import React from 'react';

function NoRecipe({ navigate }) {
  return (
    <div className="no-recipe-container">
      <h2>No Recipe Selected!</h2>
      <p>Please start a recipe from the Recipes or Challenges page to see details here.</p>

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button onClick={() => navigate('/recipes')} className="nav-button">
          Go to Recipes
        </button>
        <button onClick={() => navigate('/challenges')} className="nav-button">
          Go to Challenges
        </button>
      </div>

      {/* Tooltip or help text */}
      <p className="help-text">
        <em>Once you start a recipe, it will appear here with steps and ingredients.</em>
      </p>
    </div>
  );
}

export default NoRecipe;
