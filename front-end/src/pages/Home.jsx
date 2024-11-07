// import '../index.css'
// import '../Home.css'
// import { useNavigate } from 'react-router-dom';


// function Home(){
//     const navigate = useNavigate();
//     function goToActivityTracker(){
//         navigate('/activity-tracker')
//     }
//     return(<>
//         <h1>HOME PAGE</h1>
//         <div className='weekly-acitivty-div'>
//             <button onClick={goToActivityTracker}>(click for) See More</button>

//         </div>
//         </>
//     );
// }

// export default Home

import '../index.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

const Home = () => {
    const [activitiesData, setActivitiesData] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [recipeData, setRecipeData] = useState([]);

    //share recipe states
    const [recipe, setRecipe] = useState("");
    const [story, setStory] = useState("");
    const [foodName, setFoodName] = useState("");
    const [share, setShare] = useState(false);

    const [error, setError] = useState('');

    
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try{
            const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/challenges`);
            const fetchedData = response.data || [];
            console.log('fetchedActivitesData:', fetchedData);

            setActivitiesData([...fetchedData]);}
            catch(error){
                console.error('Error fetching activitiesData:', error);
            }
        };

        const fetchWeeklyData = async () => {
            try{
            const response = await axios.get('https://my.api.mockaroo.com/home_weekly_activity.json?key=786e37d0');
            const fetchedData = response.data || [];
            console.log(fetchedData);

            setWeeklyData([...fetchedData]);
            }
            catch(error){
                console.error('Error fetching weekly data: ', error)
            }
        };

        const fetchRecipeData = async () => {
            try{
            const response = await axios.get('https://my.api.mockaroo.com/basic_recipe.json?key=786e37d0');
            const fetchedData = response.data || [];
            console.log(fetchedData);

            setRecipeData([...fetchedData]);
            }catch(error){
                console.error('error fetching recipe data: ', error)
            }
        };

        fetchWeeklyData();
        fetchActivitiesData();
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
            {activitiesData.length > 0 && (
                <div className="activity-card" onClick={goToActivityTracker}>
                    <h2>ACTIVITY CHART</h2>
                    <div className="activity-image">
                        <img src={activitiesData[0].image} alt="Activity 1" />
                    </div>
                    <h3>Weekly Activities</h3>
                    {weeklyData.length > 0 ? (
                        <>
                            <p><strong>Meals Recorded:</strong> {weeklyData[0].meals_recorded}</p>
                            <p><strong>Time Spent Cooking:</strong> {weeklyData[0].time_spent_cooking_1}:{weeklyData[0].time_spent_cooking_2}:{weeklyData[0].time_spent_cooking_3}</p>
                        </>
                    ) : (
                        <p>Loading weekly activity data...</p>
                    )}
                    <button onClick={goToActivityTracker}>See More</button>
                </div>
                
            )}
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
