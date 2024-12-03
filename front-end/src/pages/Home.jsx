import "../index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Home.css";
import ShareRecipe from "../components/ShareRecipe";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Home = () => {
  const [weeklyActivitiesData, setWeeklyActivitiesData] = useState([]);
  const [weeklyActivitiesStats, setWeeklyActivitiesStats] = useState({
    date: new Date(),
    numActivities: 0,
    activityMins: 0,
  });
  const [recipeData, setRecipeData] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);

  const [share, setShare] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeeklyActivitiesData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_PORT}/api/users`
        );
        const fetchedData = response.data || [];

        // Simulate a specific user's data without database implementation
        const activitiesData = fetchedData[0]?.activities || [];

        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate);
        lastWeekDate.setDate(currentDate.getDate() - 7);

        const weeklyActivitiesData = activitiesData.filter((activity) => {
          const [month, day, year] = activity.date.split("/");
          const date = new Date(year, month - 1, day);
          return date >= lastWeekDate && date <= currentDate;
        });

        setWeeklyActivitiesData(weeklyActivitiesData);

        setWeeklyActivitiesStats({
          date: new Date(),
          numActivities: weeklyActivitiesData.length,
          activityMins: weeklyActivitiesData.reduce(
            (sum, activity) => sum + activity.duration,
            0
          ),
        });
      } catch (error) {
        console.error("Error fetching activities data:", error);
      }
    };

    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_PORT}/api/recipes`
        );
        const fetchedData = response.data || [];
        setRecipeData(fetchedData);

        // Shuffle and pick up to 4 random recipes
        setRandomRecipes(shuffleArray(fetchedData).slice(0, 4));
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchWeeklyActivitiesData();
    fetchRecipeData();
  }, []);

  async function submitShareRecipe(newRecipe) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_PORT}/api/shareRecipe`,
        newRecipe,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      closeShare();
    } catch (error) {
      console.error(
        "Error submitting recipe:",
        error.response?.data || error.message
      );
    }
  }

  const goToActivityTracker = () => {
    navigate("/activity-tracker");
  };

  const handleStartRecipe = (selectedRecipe) => {
    navigate("/record", { state: { selectedRecipe } });
  };

  const handleShareRecipe = () => {
    setShare(true);
  };

  const closeShare = () => {
    setShare(false);
  };

  return (
    <>
      <h1>Home</h1>
      <div className="home-container">
        {weeklyActivitiesData.length > 0 && (
          <div className="activity-card" onClick={goToActivityTracker}>
            <h2>ACTIVITY CHART</h2>
            <div className="activity-image">
              <img src={weeklyActivitiesData[0].image} alt="Activity 1" />
            </div>
            <h3>Weekly Activities</h3>
            <p>
              <strong>Meals Recorded:</strong>{" "}
              {weeklyActivitiesStats.numActivities}
            </p>
            <p>
              <strong>Time Spent Cooking:</strong>{" "}
              {weeklyActivitiesStats.activityMins} min
            </p>

    console.log("weeklyActivitiesData.length:" + weeklyActivitiesData.length)
    return (
        <>
        <h1>Home</h1>
        <div className="home-container">
            {
              <>
                <p>
                  <strong>Meals Recorded:</strong>{" "}
                  {weeklyActivitiesStats["numActivities"]}
                </p>
                <p>
                  <strong>Time Spent Cooking:</strong>{" "}
                  {weeklyActivitiesStats["activityMins"]} min
                </p>
              </>
            }
            <button onClick={goToActivityTracker}>See More</button>
          </div>
        )}

        <div className="recipe-card">
          <h2>Share A Recipe</h2>
          <p>
            Sharing a recipe is an opportunity to connect with others, celebrate
            culinary traditions, and foster a sense of community.
          </p>
          <button className="make-recipe-button" onClick={handleShareRecipe}>
            Share Recipe
          </button>
        </div>

        {share && (
          <ShareRecipe
            closeShare={closeShare}
            submitShareRecipe={submitShareRecipe}
          />
        )}

        {randomRecipes.length > 0 &&
          randomRecipes.map((recipe, index) => (
            <div key={recipe.id} className="recipe-card">
              <p className="recipe-type">
                {index === 0 ? "Suggested Recipe" : "Friend's Recipe"}
              </p>
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <div className="recipe-image">
                <img src="https://picsum.photos/100" alt={recipe.name} />
              </div>
              <button
                className="make-recipe-button"
                onClick={() => handleStartRecipe(recipe)}
              >
                Make Recipe
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
