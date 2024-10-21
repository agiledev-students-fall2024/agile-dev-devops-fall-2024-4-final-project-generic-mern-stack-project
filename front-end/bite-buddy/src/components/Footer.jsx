import '../index.css'
import './HamburgerDropdown.css';
import {Link} from 'react-router-dom';
import {useState } from 'react';

function Nav(){
    const [activeTab, setActiveTab] = useState('home')
    console.log(activeTab)
    return (
        <div className='nav'>
            <Hamburger activeTab={activeTab} setActiveTab={setActiveTab} />
            <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* Other components */}
        </div>
    );
}

function Footer({activeTab, setActiveTab}){
    return(
        <footer>
            <nav className = 'navbar'>
                
            <Link
                to="/home"
                className={activeTab === 'home' ? 'active' : ''}
                onClick={() => setActiveTab('home')}
            >
                Home
            </Link>
            <Link
                to="/recipes"
                className={activeTab === 'recipes' ? 'active' : ''}
                onClick={() => setActiveTab('recipes')}
            >
                Recipes
            </Link>
            <Link
                to="/record"
                className={activeTab === 'record' ? 'active' : ''}
                onClick={() => setActiveTab('record')}
            >
                Record
            </Link>
            <Link
                to="/challenges"
                className={activeTab === 'challenges' ? 'active' : ''}
                onClick={() => setActiveTab('challenges')}
            >
                Challenges
            </Link>
            <Link
                to="/profile"
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
            >
                Profile
            </Link>                        
            </nav>
        </footer>

    );
}

function Hamburger({activeTab, setActiveTab}){
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="hamburger-dropdown">
            <button className="hamburger" onClick={toggleDropdown}>
                &#9776;
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><Link to="/challenges" onClick={() => {setActiveTab('challenges');setIsOpen(false)}}>Challenges</Link></li>
                        <li><Link to="/record" onClick={() => {setActiveTab('record');setIsOpen(false)}}>Record Activity</Link></li>
                        <li><Link to="/profile" onClick={() => {setActiveTab('profile');setIsOpen(false)}}>Profile</Link></li>
                        <li><Link to="/login">Sign Out</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Nav