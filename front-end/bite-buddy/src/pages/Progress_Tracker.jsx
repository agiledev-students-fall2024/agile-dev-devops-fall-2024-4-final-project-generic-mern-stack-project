import '../index.css'
import {useState, useEffect } from 'react'
import axios from 'axios'

function Progress_Tracker(){
    const [progressData, setProgressData] = useState({'complete': [], 'incomplete': []})

    useEffect(() => {
        const fetchProgressData = async () => {

            const response = await axios.get('https://my.api.mockaroo.com/users.json?key=66da8e80');
            const fetchedData = response.data || [];
            console.log(fetchedData)
            
            // not sure of better way to get specific user data without auth system
            const myProgressData = fetchedData[0]
            console.log(myProgressData)
            
            // when database is set up, challenges will be saved in user document by id instead of name. ids will be used to reference challenge information.
            const completedChallenges = fetchedData[0]['challenges'].filter(challenge => {return challenge['completed']})
            const completedChallengeNames = completedChallenges.map(challenge => challenge.name)
            console.log(completedChallengeNames)

            const incompleteChallenges = fetchedData[0]['challenges'].filter(challenge => {return !challenge['completed']})
            const incompleteChallengeNames = incompleteChallenges.map(challenge => challenge.name)
            console.log(incompleteChallengeNames)

            setProgressData({'complete': completedChallengeNames, 'incomplete': incompleteChallengeNames});
        };

        fetchProgressData();
    }, []); 

    return(
        <div className='progress-tracker'>
            <h1 className='progress-tracker-title'>Progress Tracker</h1>
            {progressData['complete'].map((challenge, subIndex) => (
                <div className="progress-card" key={subIndex} complete="true">
                    <h3>{challenge}</h3>
                </div>
            ))}
            {progressData['incomplete'].map((challenge, subIndex) => (
                <div className="progress-card" key={subIndex} complete="false">
                    <h3>{challenge}</h3>
                </div>
            ))}
        </div>
    )
    
}
export default Progress_Tracker