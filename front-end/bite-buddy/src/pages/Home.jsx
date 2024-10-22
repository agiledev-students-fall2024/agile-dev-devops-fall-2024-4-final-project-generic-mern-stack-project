import '../index.css'
import { useNavigate } from 'react-router-dom';


function Home(){
    const navigate = useNavigate();
    function goToActivityTracker(){
        navigate('/activity-tracker')
    }
    return(<>
        <h1>HOME PAGE</h1>
        <div className='weekly-acitivty-div'>
            <button onClick={goToActivityTracker}>(click for) Weekly Activity</button>

        </div>
        </>
    );
}

export default Home