// IngredientsList.jsx
import React from 'react';

function IngredientsList({ ingredients , selectedIngredients, handleIngredientSelect}) {
  return (
    <div>
      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {ingredients?.item?.map((ingredient, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" className="strikethrough" checked={selectedIngredients.includes(index)} onChange={() => handleIngredientSelect(index)}/> 
              <span>{ingredient}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsList;
