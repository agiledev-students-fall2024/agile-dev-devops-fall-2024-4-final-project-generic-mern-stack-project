import '../index.css';
import '../recipes.css';
import { useState } from 'react';

function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipeData = [
    { dish: 'Recipe 1',difficulty:"novice",description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',steps: ['Put your right foot in','Put your right foot out','Hokey Pokey'], imgs:['https://picsum.photos/400','https://picsum.photos/400','https://picsum.photos/400'] },
    { dish: 'Recipe 2',difficulty:"novice",description:'lorem ipsum dish',steps: ['Put your right foot in','Put your right foot out','Hokey Pokey'], imgs:['https://picsum.photos/400','https://picsum.photos/400','https://picsum.photos/400']},
    { dish: 'Recipe 3',difficulty:"novice",description:'lorem ipsum dish',steps: ['Put your right foot in','Put your right foot out','Hokey Pokey'], imgs:['https://picsum.photos/400','https://picsum.photos/400','https://picsum.photos/400']},
  ];

  const handleStartClick = (recipeItem) => {
    setSelectedRecipe(recipeItem);
  };

  const close = () => {
    setSelectedRecipe(null);
  };

  return (
    <html>
    <body>
    <div>
      <h1 className="centered-header">RECIPES</h1>



      
      <div className = "recipeDashboardOuter">

      <h2 className = "recipeHeader">Novice</h2>
      {recipeData.map((recipeItem, index) => (
        recipeItem.difficulty === "novice" && (
        <div className = "recipeDashboardInner" rekey={index}>
          <button className = "recipeCard" onClick={() => handleStartClick(recipeItem)}>
            <div className = "recipeText">
              <h1>{recipeItem.dish}</h1>
              <p>{recipeItem.description}</p></div>
 
            <br></br>
            <img src = {recipeItem.imgs[0]} alt="oops,img problems!"></img>
          </button>
        </div>
        )
      ))}
      </div>
      

      {selectedRecipe && (
        <div className="popup-overlay" onClick={close}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h1 >{selectedRecipe.dish}</h1>
            <p><strong>Description:</strong> {selectedRecipe.description}</p>

            <h2>Step 1: </h2>
            <p>{selectedRecipe.steps[0]}</p>
            <img src = {selectedRecipe.imgs[0]} alt="oops,img problems!"></img>

            <h2>Step 2: </h2>
            <p>{selectedRecipe.steps[1]}</p>
            <img src = {selectedRecipe.imgs[1]} alt="oops,img problems!"></img>

            <h2>Step 3: </h2>
            <p>{selectedRecipe.steps[2]}</p>
            <img src = {selectedRecipe.imgs[2]} alt="oops,img problems!"></img>

            <button className="close-button" onClick={close}>Close</button>
          </div>
        </div>
      )}
    </div>
    </body>
    </html>
  );
}

export default Recipes;
