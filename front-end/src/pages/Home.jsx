
import '../index.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

const Home = () => {
    const [weeklyActivitiesData, setWeeklyActivitiesData] = useState([]);
    const [weeklyActivitiesStats, setWeeklyActivitiesStats] = useState({date: new Date(), numActivities: 0, activityMins: 0})
    const [recipeData, setRecipeData] = useState([]);

    //share recipe states
    const [recipe, setRecipe] = useState("");
    const [story, setStory] = useState("");
    const [foodName, setFoodName] = useState("");
    const [share, setShare] = useState(false);

    const [error, setError] = useState('');

    const navigate = useNavigate();

    /*const isThisWeek = (dateString, currentDate, lastWeekDate) => {
        const [month, day, year] = dateString.split('/');
        const date = new Date(year, month - 1, day);
        return date >= lastWeekDate && date <= currentDate;
    }*/

    useEffect(() => {
        const fetchWeeklyActivitiesData = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/users`);
                const fetchedData = response.data || [];

                // get specific user without database implementatin
                const activitiesData = fetchedData[0].activities
                
                const currentDate = new Date()
                const lastWeekDate = new Date(currentDate)
                lastWeekDate.setDate(currentDate.getDate() - 7)

                const weeklyActivitiesData = activitiesData.filter(activity => {
                    const [month, day, year] = activity.date.split('/');
                    const date = new Date(year, month - 1, day);
                    return date >= lastWeekDate && date <= currentDate;
                })

                setWeeklyActivitiesData(weeklyActivitiesData);
                console.log(weeklyActivitiesData)

                setWeeklyActivitiesStats({
                    date: new Date(),
                    numActivities: activitiesData.length,
                    activityMins: activitiesData.reduce((sum, activity) => sum + activity.duration, 0)
                })
                console.log(weeklyActivitiesStats)
            }
            catch(error){
                console.error('Error fetching activitiesData:', error);
            }
        };

        const fetchRecipeData = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/basicRecipe`);
            const fetchedData = response.data || [];
            //console.log(fetchedData);

            setRecipeData([...fetchedData]);
            }catch(error){
                console.error('error fetching recipe data: ', error)
            }
        };

        fetchWeeklyActivitiesData();
        fetchRecipeData();
    }, []);

    async function submitShareRecipe(e){
        // e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACK_PORT}/api/shareRecipe`, { foodName, story, recipe });
            console.log(response.data.message);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data.message || 'Login failed');
            console.error(err);
        }
    }

    const goToActivityTracker = () => {
        navigate('/activity-tracker');
    };

    const goToRecipePage = () => {
        navigate('/recipes');
    };

    const handleShareRecipe = () => {
        setShare(true);
    }

    const closeShare = () => {
        setShare(false);
    }

    return (
        <div className="home-container">
            <h1>Home Page</h1>
            {
                weeklyActivitiesData.length > 0 ? (<div className="activity-card" onClick={goToActivityTracker}>
                    <h2>ACTIVITY CHART</h2>
                    <div className="activity-image">
                        <img src={weeklyActivitiesData[0].image} alt="Activity 1" />
                    </div>
                    <h3>Weekly Activities</h3>
                    {
                        <>
                            <p><strong>Meals Recorded:</strong> {weeklyActivitiesStats['numActivities']}</p>
                            <p><strong>Time Spent Cooking:</strong> {weeklyActivitiesStats['activityMins']} min</p>
                        </>
                    }
                    <button onClick={goToActivityTracker}>See More</button>
                </div>)
                :
                <></>
            }
            <div className="recipe-card">
                <h2>Share A Recipe </h2>
                <p>Sharing a recipe in our app is more than just providing a list of ingredients and steps; it's an opportunity to connect with others, celebrate culinary traditions, and foster a sense of community.</p>
                <button className="make-recipe-button" onClick={handleShareRecipe}>Share Recipe</button>
            </div>

            {share && (
                <div className="full-page-card">
                    <button className="share-close-button" onClick={closeShare}>X</button>
                    <form className = "share-form" onSubmit={submitShareRecipe}>
                        <label>Enter Food Name:
                            <input className="input-text-area-share" type="text" placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                        </label>
                        <label>Enter Story:
                            <textarea className="share-text-area" placeholder="Optional" value={story} onChange={(e) => setStory(e.target.value)} />
                        </label>
                        <label>Enter Recipe:
                            <textarea className="share-text-area" placeholder="Recipe" value={recipe} onChange={(e) => setRecipe(e.target.value)} />
                        </label>
                        <button type="submit" className="share-button">Share</button>
                    </form>
                </div>
            )}

            {recipeData.length > 0 && (
                <>
                    <div className="recipe-card">
                        <p className="recipe-type">Suggested Recipe</p>
                        <h2>{recipeData[0].recipe_name}</h2>
                        <p>{recipeData[0].recipe_description}</p>
                        <div className="recipe-image">
                        <img src="https://picsum.photos/100" alt={recipeData[1].recipe_name} />
                        </div>
                        <button className="make-recipe-button" onClick={goToRecipePage}>Make Recipe</button>
                    </div>
                    

                    {recipeData.length > 1 && (
                        <div className="recipe-card">
                            <p className="recipe-type">Friend's Recipe</p>
                            <h2>{recipeData[1].recipe_name}</h2>
                            <p>{recipeData[1].recipe_description}</p>
                            <div className="recipe-image">
                                <img src="https://picsum.photos/100" alt={recipeData[1].recipe_name} />
                            </div>
                            <button className="make-recipe-button" onClick={goToRecipePage}>Make Recipe</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
