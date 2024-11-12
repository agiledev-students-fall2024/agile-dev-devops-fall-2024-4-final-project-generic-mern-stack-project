import "../index.css";
import "../recipes.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer.jsx";

function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeData, setRecipeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_PORT}/api/recipes`
        );
        const formattedData = response.data.map((item) => ({
          dish: item.recipe_name,
          difficulty: item.difficulty_level,
          ingredients: item.ingredients,
          steps: item.instructions ? item.instructions.split(". ") : [],
          duration: item.total_time,
          //imgs: `${process.env.REACT_APP_BACK_PORT}/api/recipePics`,
          imgs: "https://picsum.photos/400",
        }));
        setRecipeData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
  const handleStartRecipe = (recipeId) => {
    // Navigate to the record activity page, passing the recipe data
    console.log("going to recipe id:" + recipeId);
    navigate("/record", { state: { recipeId } });
  };

  return (
    <div className="recipePage">
      <div className="recipeDashboardOuter">
        <h1 className="centered-header">RECIPES</h1>
        <h2 className="recipeHeader">Novice Recipes</h2>
        <div className="recipeDashboardInner">
          {recipeData.map((recipeItem, index) => (
            <div
              className="recipeCard"
              onClick={() => handleStartClick(recipeItem)}
              key={index}
            >
              <div className="recipeImg">
                <img src={recipeItem.imgs} alt="oops,img problems!" />
              </div>
              <div className="recipeText">
                <h1>Food: {recipeItem.dish}</h1>
                <p>Ingredients: {recipeItem.ingredients}</p>
              </div>
              <button
                className="start-button"
                onClick={() => handleStartRecipe(recipeItem.id)}
              >
                START RECIPE
              </button>
              <Timer duration={recipeItem.duration} />
            </div>
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <div className="popup-overlay" onClick={close}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h1>Dish: {selectedRecipe.dish}</h1>
            <p>
              <strong>Ingredients:</strong> {selectedRecipe.ingredients}
            </p>
            <button
              className="start-button"
              onClick={() => handleStartRecipe(selectedRecipe.id)}
            >
              START RECIPE
            </button>
            {selectedRecipe.steps.map((step, index) => (
              <div key={index}>
                <h2>Step {index + 1}:</h2>
                <p>{step}</p>
                <img src={selectedRecipe.imgs} alt="oops,img problems!" />
              </div>
            ))}
          </div>
          <button className="close-button" onClick={close}>
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default Recipes;