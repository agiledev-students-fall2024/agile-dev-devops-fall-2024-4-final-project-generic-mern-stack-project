import '../index.css';
import '../recipes.css';
import { useState } from 'react';

function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipeData = [
    { dish: 'Recipe 1',steps: ['Put your right foot in','Put your right foot out','Hokey Pokey'], imgs:['#','#','#'] },
    { dish: 'Recipe 2' },
    { dish: 'Recipe 3' },
  ];

  const handleStartClick = (recipeItem) => {
    setSelectedRecipe(recipeItem);
  };

  const close = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <h1 className="centered-header">RECIPES</h1>
      <ul>
        {recipeData.map((recipeItem, index) => (
          <li key={index}>
            <button onClick={() => handleStartClick(recipeItem)}>
              {recipeItem.dish}
            </button>
          </li>
        ))}
      </ul>

      {selectedRecipe && (
        <div className="popup-overlay" onClick={close}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.dish}</h2>
            <p>Steps for {selectedRecipe.dish}</p>
            <p>{selectedRecipe.steps[0]}</p>
            


            <button className="close-button" onClick={close}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipes;
