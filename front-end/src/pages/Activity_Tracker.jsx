import '../index.css'
import {useState, useEffect } from 'react'
import axios from 'axios'


function Activity_Tracker(){
    const [activitiesData, setActivitiesData] = useState([])

    useEffect(() => {
        const fetchActivitiesData = async () => {
            const response = await axios.get('https://my.api.mockaroo.com/activities_tracker?key=594b4990');
            const fetchedData = response.data || [];
            console.log(fetchedData)

            setActivitiesData([...fetchedData]);
        };

        fetchActivitiesData();
    }, []); 

    return(
        <div className='activity-tracker-container'>
        
            <div className='activity-tracker-header'>
                <h1 className='activity-tracker-title'>Activities Tracker</h1>
            </div>
            
        
            <div className='tab-content'>
                <div className='activities-div'>
                {activitiesData.map((activity, index) => (
                    <div className="activity-card" key={index}>
                        <h2>{activity.date}</h2>
                        <h3>{activity.activity_name}</h3>
                        <p>{activity.activity_description}</p>
                    </div>
                ))}
                </div>

            </div>
            
        </div>
    )
    
}
export default Activity_Tracker