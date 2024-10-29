import '../index.css';
import '../recipes.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get('https://my.api.mockaroo.com/recipes.json?key=a170a060');
        const formattedData = response.data.map((item) => ({
          dish: item.recipe_name,
          difficulty: item.difficulty_level,
          ingredients: item.ingredients,
          steps: item.instructions ? item.instructions.split(". ") : [],
          imgs: 'https://picsum.photos/400',
        }));
        setRecipeData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipeData();
  }, []);

  const handleStartClick = (recipeItem) => {
    setSelectedRecipe(recipeItem);
  };

  const close = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className='recipePage'>
      <div className="recipeDashboardOuter">
        <h1 className="centered-header">RECIPES</h1>
        <h2 className="recipeHeader">Novice Recipes</h2>
        <div className="recipeDashboardInner">
            {recipeData.map((recipeItem, index) => (
                <div className="recipeCard" onClick={() => handleStartClick(recipeItem)} key={index}>
                    <div className='recipeImg'>
                        <img src={recipeItem.imgs} alt="oops,img problems!" />
                    </div>
                    <div className='recipeText'>
                        <h1>Food: {recipeItem.dish}</h1>
                        <p>Ingredients: {recipeItem.ingredients}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {selectedRecipe && (
        <div className="popup-overlay" onClick={close}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h1>Dish: {selectedRecipe.dish}</h1>
            <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>

            {selectedRecipe.steps.map((step, index) => (
              <div key={index}>
                <h2>Step {index + 1}:</h2>
                <p>{step}</p>
                <img src={selectedRecipe.imgs} alt="oops,img problems!" />
              </div>
            ))}
          </div>
          <button className="close-button" onClick={close}>X</button>
        </div>
      )}
    </div>
  );
}

export default Recipes;
