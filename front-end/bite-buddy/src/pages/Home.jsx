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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try{
            const response = await axios.get('https://my.api.mockaroo.com/challenges?key=d6450400');
            const fetchedData = response.data || [];
            console.log('fetchedActivitesData:', fetchedData);

            setActivitiesData([...fetchedData]);}
            catch(error){
                console.error('Error fetching activitiesData:', error);
            }
        };

        const fetchWeeklyData = async () => {
            try{
            const response = await axios.get('https://my.api.mockaroo.com/home_weekly_activity.json?key=bd61d090');
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
            const response = await axios.get('https://my.api.mockaroo.com/basic_recipe.json?key=bd61d090');
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

    const goToActivityTracker = () => {
        navigate('/activity-tracker');
    };

    const goToRecipePage = () => {
        navigate('/recipes');
    };

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
