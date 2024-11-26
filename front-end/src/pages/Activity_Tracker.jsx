import '../index.css'
import {useState, useEffect } from 'react'
import axios from '../axiosConfig';


function Activity_Tracker(){
    const [activitiesData, setActivitiesData] = useState([])

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try {  
                const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/users`);
                const fetchedData = response.data || [];

                const activitiesData = fetchedData[0].activities
               setActivitiesData(activitiesData)
            }catch(error){
                console.error('Error fetching activities')
            }
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
                        <h3>{activity.name}</h3>
                        <p>{activity.description}</p>
                    </div>
                ))}
                </div>

            </div>
            
        </div>
    )
    
}
export default Activity_Tracker