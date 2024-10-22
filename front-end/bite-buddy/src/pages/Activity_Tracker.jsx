import '../index.css'
import {useState } from 'react'


function Activity_Tracker(){
    const [activeTab, setActiveTab] = useState('activities')
    
    const handleTabChange = (tab)=>{
        setActiveTab(tab);
    }

    const activityData = [
        { title: "Activity Title", description: "text text text text text text text text text text text text text text text text ", completedOn:"2024-10-15"},
        { title: "Activity Title", description: "text text text text text text text text text text text text text text text text ", completedOn:"2024-10-15"},
        { title: "Activity Title", description: "text text text text text text text text text text text text text text text text ", completedOn:"2024-10-15"},
        { title: "Activity Title", description: "text text text text text text text text text text text text text text text text ", completedOn:"2024-10-15"},
        { title: "Activity Title", description: "text text text text text text text text text text text text text text text text ", completedOn:"2024-10-15"},
    ]

    return(
        <div className='activity-tracker-container'>
        
            <div className='activity-tracker-header'>
                <h1 className='activity-tracker-title'>Activities Tracker</h1>
                <div className='activity-nav'>
                    <button
                    className={activeTab==='progress'? 'active': ''}
                    onClick={()=>handleTabChange('progress')}>Progress
                    </button>
                    <button
                        className={activeTab==='activities'? 'active': ''}
                        onClick={()=>handleTabChange('activities')}>Activities
                    </button>
                </div>
            </div>
            
        
        <div className='tab-content'>
            {activeTab==='progress' && (
                <div>
                    <h2>Progress Tab Open</h2>
                </div>
            )}
            {activeTab==='activities' && (
                 <div className='activities-div'>
                    {activityData.map((activity, index) => (
                    <div className="activity-card" key={index}>
                        <h2>{activity.completedOn}</h2>
                        <h3>{activity.title}</h3>
                        <p>{activity.description}</p>
                    </div>
                ))}
                </div>
            )}

        </div>
            
        </div>
    )
    
}
export default Activity_Tracker