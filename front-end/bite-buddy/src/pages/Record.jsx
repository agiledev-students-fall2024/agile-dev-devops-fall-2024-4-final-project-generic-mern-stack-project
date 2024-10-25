import '../index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Record() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [currRecipe, setCurrRecipe] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { recipeId } = location.state || {};

  const [completedSteps, setCompletedSteps] = useState([]);
  const handleStepComplete = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) 
        ? prev.filter((stepIndex) => stepIndex !== index) // Remove index if it exists
        : [...prev, index] // Add index if it doesn't exist
    );
  };

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/recipe_steps?key=d6450400');
        const fetchedData = response.data || [];
        console.log('Fetched all data:', fetchedData);
        setAllRecipes([...fetchedData]);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    if (recipeId){
      console.log('Recipe ID is', recipeId);
      const currentRecipe = allRecipes.filter((ele) => ele.id === recipeId); // [{recipe}]
      
      if (currentRecipe.length > 0) {
        setCurrRecipe(currentRecipe[0]);
        console.log('Current Recipe:', currentRecipe[0]);
      } else {
        console.warn(`No recipe found for ID: ${recipeId}`);
      }
    }
  }, [recipeId, navigate, allRecipes]);

  if (!recipeId) {
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

  return (
    <div className='record-container'>
      <h1>Current Activity: {currRecipe.recipe_name || 'N/A'}</h1>
      <h2>Description of Activity: {currRecipe.recipe_description || 'N/A'}</h2>

      <h3>Ingredients:</h3>
      <ul className='ingredients-list'>
        {currRecipe.ingredients?.item?.map((ingredient, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                className="strikethrough"
              />{' '}
              <span>{ingredient}</span>
            </label>
          </li>
        ))}
      </ul>

      <h3>Steps:</h3>
      <div className="steps-container">
        {currRecipe.recipe_steps?.steps?.map((step, index) => (
          <div key={index} className="step-card">
            <h4>Step {index + 1}</h4>
            <p>{step}</p>
            <button
              className={`steps-button ${completedSteps.includes(index) ? 'completed' : 'default'}`}
              onClick={() => handleStepComplete(index)}
            >
              {completedSteps.includes(index) ? 'Completed' : 'Mark as Completed'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Record;