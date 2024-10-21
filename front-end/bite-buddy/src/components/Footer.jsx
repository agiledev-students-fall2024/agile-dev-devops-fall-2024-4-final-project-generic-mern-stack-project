import '../index.css'
import { Link } from 'react-router-dom';

function Footer(){

    return(
        <footer>
            <nav className = 'navbar'>
                
                <Link to ="/">Home</Link>
                <Link to ="/recipes">Recipes</Link>
                <Link to ="/record">Record</Link>
                <Link to = "/challenges">Challenges</Link>
                <Link to="/profile">Profile</Link>
                        
            </nav>
        </footer>

    );
}

export default Footer