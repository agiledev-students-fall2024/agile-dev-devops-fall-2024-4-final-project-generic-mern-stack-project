import "../index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Home.css";
import ShareRecipe from "../components/ShareRecipe";
import FileUpload from "../components/FileUpload";
const Home = () => {
  const [weeklyActivitiesData, setWeeklyActivitiesData] = useState([]);
  const [weeklyActivitiesStats, setWeeklyActivitiesStats] = useState({
    date: new Date(),
    numActivities: 0,
    activityMins: 0,
  });
  const [recipeData, setRecipeData] = useState([]);

  //share recipe states

  const [share, setShare] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  /*const isThisWeek = (dateString, currentDate, lastWeekDate) => {
        const [month, day, year] = dateString.split('/');
        const date = new Date(year, month - 1, day);
        return date >= lastWeekDate && date <= currentDate;
    }*/

  useEffect(() => {
    const fetchWeeklyActivitiesData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_PORT}/api/users`
        );
        const fetchedData = response.data || [];

        // get specific user without database implementatin
        const activitiesData = fetchedData[0].activities;

        const currentDate = new Date();
        const lastWeekDate = new Date(currentDate);
        lastWeekDate.setDate(currentDate.getDate() - 7);

        const weeklyActivitiesData = activitiesData.filter((activity) => {
          const [month, day, year] = activity.date.split("/");
          const date = new Date(year, month - 1, day);
          return date >= lastWeekDate && date <= currentDate;
        });

        setWeeklyActivitiesData(weeklyActivitiesData);
        console.log(weeklyActivitiesData);

        setWeeklyActivitiesStats({
          date: new Date(),
          numActivities: activitiesData.length,
          activityMins: activitiesData.reduce(
            (sum, activity) => sum + activity.duration,
            0
          ),
        });
        console.log(weeklyActivitiesStats);
      } catch (error) {
        console.error("Error fetching activitiesData:", error);
      }
    };

    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_PORT}/api/recipes`
        );
        const fetchedData = response.data || [];
        console.log("fetch basic recipes", fetchedData);

        setRecipeData([...fetchedData]);
      } catch (error) {
        console.error("error fetching recipe data: ", error);
      }
    };

    fetchWeeklyActivitiesData();
    fetchRecipeData();
  }, []);

  async function submitShareRecipe(newRecipe) {
    try {
      console.log("submitted");
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_PORT}/api/shareRecipe`,
        newRecipe,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
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
    // Navigate to the record activity page, passing the recipe data
    console.log("going to recipe id:" + selectedRecipe.id);
    console.log("selectedrecipe is", selectedRecipe);
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
        {weeklyActivitiesData.length > 0 ? (
          <div className="activity-card" onClick={goToActivityTracker}>
            <h2>ACTIVITY CHART</h2>
            <div className="activity-image">
              <img src={weeklyActivitiesData[0].image} alt="Activity 1" />
            </div>
            <h3>Weekly Activities</h3>

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
        ) : (
          <></>
        )}
        <div className="recipe-card">
          <h2>Share A Recipe </h2>
          <p>
            Sharing a recipe in our app is more than just providing a list of
            ingredients and steps; it's an opportunity to connect with others,
            celebrate culinary traditions, and foster a sense of community.
          </p>
          <button className="make-recipe-button" onClick={handleShareRecipe}>
            Share Recipe
          </button>
        </div>

        {share && (
          <ShareRecipe
            closeShare={closeShare}
            submitShareRecipe={submitShareRecipe}
          ></ShareRecipe>
        )}

        {recipeData.length > 0 && (
          <>
            <div className="recipe-card">
              <p className="recipe-type">Suggested Recipe</p>
              <h2>{recipeData[0].name}</h2>
              <p>{recipeData[0].description}</p>
              <div className="recipe-image">
                <img src="https://picsum.photos/100" alt={recipeData[1].name} />
              </div>
              <button
                className="make-recipe-button"
                onClick={() => handleStartRecipe(recipeData[0])}
              >
                Make Recipe
              </button>
            </div>

            {recipeData.length > 1 && (
              <div className="recipe-card">
                <p className="recipe-type">Friend's Recipe</p>
                <h2>{recipeData[1].name}</h2>
                <p>{recipeData[1].description}</p>
                <div className="recipe-image">
                  <img
                    src="https://picsum.photos/100"
                    alt={recipeData[1].name}
                  />
                </div>
                <button
                  className="make-recipe-button"
                  onClick={() => handleStartRecipe(recipeData[1])}
                >
                  Make Recipe
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
