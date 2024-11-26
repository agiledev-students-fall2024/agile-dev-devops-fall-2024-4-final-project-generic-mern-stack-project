import '../index.css'
import {useState, useEffect } from 'react'
import axios from 'axios'

function Progress_Tracker(){
    const [progressData, setProgressData] = useState({'complete': [], 'incomplete': []})

    useEffect(() => {
        const fetchProgressData = async () => {

            const response = await axios.get(`${process.env.REACT_APP_BACK_PORT}/api/users`);
            const fetchedData = response.data || [];
            console.log(fetchedData)
            
            // not sure of better way to get specific user data without auth system
            const myProgressData = fetchedData[0]
            console.log(myProgressData)
            
            // when database is set up, recipes  will be saved in user document by id instead of name. ids will be used to reference recipe information.
            const completedRecipes = myProgressData['recipes'].filter(recipe => {return recipe['completed']})
            const completedRecipeNames = completedRecipes.map(recipe => recipe.name)
            console.log(completedRecipeNames)

            const incompleteRecipes = myProgressData['recipes'].filter(recipe => {return !recipe['completed']})
            const incompleteRecipeNames = incompleteRecipes.map(recipe => recipe.name)
            console.log(incompleteRecipeNames)

            const progressPercent = (((completedRecipeNames.length * 100 / (completedRecipeNames.length + incompleteRecipeNames.length))) || 0).toFixed(2)

            setProgressData({'complete': completedRecipeNames, 'incomplete': incompleteRecipeNames, 'percent': progressPercent});
        };

        fetchProgressData();
    }, []); 

    return(
        <div className='progress-tracker'>
            <h1 className='progress-tracker-title'>Progress Tracker</h1>
            <h2 className='progress-tracker-amount'>Goal Recipes Completed:<br/>{progressData['percent']}%</h2>
            <div className='progress-cards'>
                {progressData['complete'].map((recipe, subIndex) => (
                    <div className="progress-card" key={subIndex} complete="true">
                        <h3>{recipe}</h3>
                    </div>
                ))}
                {progressData['incomplete'].map((recipe, subIndex) => (
                    <div className="progress-card" key={subIndex} complete="false">
                        <h3>{recipe}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
    
}
export default Progress_Tracker