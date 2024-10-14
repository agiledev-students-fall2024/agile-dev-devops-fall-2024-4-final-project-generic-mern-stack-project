import '../index.css'
import { Link } from 'react-router-dom';

function Footer(){

    return(
        <footer>
            <nav class = 'navbar'>
                
                <Link to ="/">Home</Link>
                <Link to ="/recipes">Recipes</Link>
                <a class = '' href='#'>Record</a>
                <a class = '' href='#'>Challenges</a>
                <a class = '' href='#'>Profile</a>
            
            </nav>
        </footer>

    );
}

export default Footer