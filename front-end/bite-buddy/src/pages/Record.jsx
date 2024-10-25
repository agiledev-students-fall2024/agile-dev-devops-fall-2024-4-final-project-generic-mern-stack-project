import '../index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Record() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [currRecipe, setCurrRecipe] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);
  const { recipeId } = location.state || {};

  const [completedSteps, setCompletedSteps] = useState([]);
  const handleStepComplete = (index) => {
    setCompletedSteps((prev) => [...prev, index]);
  };
  
  /*const handleIngredientCheck = (index) => {
   
  };*/

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/recipe_steps?key=594b4990');
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
    if (!recipeId) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        navigate('/challenges');
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer);
    } else {
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
      <div>
        <h2>Challenge Not Started</h2>
        <p>Please start a challenge from the Challenges Page to continue.</p>
        {redirecting && <p>Redirecting to Challenges Page in 3 seconds...</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>Current Activity: {currRecipe.recipe_name || 'N/A'} {currRecipe.id}</h1>
      <h2>Description of Activity: {currRecipe.recipe_description || 'N/A'}</h2>

      <h3>Ingredients:</h3>
      <ul>
        {currRecipe.ingredients?.item?.map((ingredient, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                //onChange={() => handleIngredientCheck(index)}
              />{' '}
              {ingredient}
            </label>
          </li>
        ))}
      </ul>

      <h3>Steps:</h3>
      <div className="steps-container">
        {currRecipe.recipe_steps?.step?.map((step, index) => (
          <div key={index} className="step-card">
            <h4>Step {index + 1}</h4>
            <p>{step}</p>
            <button
              onClick={() => handleStepComplete(index)}
              disabled={completedSteps.includes(index)} 
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