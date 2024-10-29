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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivitiesData = async () => {
            const response = await axios.get('https://my.api.mockaroo.com/challenges?key=d6450400');
            const fetchedData = response.data || [];
            console.log(fetchedData);

            setActivitiesData([...fetchedData]);
        };

        const fetchWeeklyData = async () => {
            const response = await axios.get('https://my.api.mockaroo.com/home_weekly_activity.json?key=bd61d090');
            const fetchedData = response.data || [];
            console.log(fetchedData);

            setWeeklyData([...fetchedData]);
        };

        fetchWeeklyData();
        fetchActivitiesData();
    }, []);

    const goToActivityTracker = () => {
        navigate('/activity-tracker');
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
                    <p><strong>Meals Recorded:</strong> {weeklyData[0].meals_recorded}</p>
                    <p><strong>Time Spent Cooking:</strong> {weeklyData[0].time_spent_cooking_1}:{weeklyData[0].time_spent_cooking_2}:{weeklyData[0].time_spent_cooking_3}</p>
                    <button onClick={goToActivityTracker}>See More</button>
                </div>
            )}
        </div>
    );
};

export default Home;
