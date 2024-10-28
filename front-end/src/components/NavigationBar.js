import {Link} from 'react-router-dom'
import './NavigationBar.css'
import { FaHome } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";
import { MdPostAdd } from "react-icons/md"
import { ImProfile } from "react-icons/im";

const NavigationBar = () => {
    return (
        <footer className="Footer-footer">
            <nav className="Footer-navbar">
                <ul className="Nav-links">
                    <li className="Nav-item">
                        <Link to="/home"><FaHome/></Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/community"><RiCommunityFill/></Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/blog"><MdPostAdd/></Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/profile"><ImProfile/></Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default NavigationBar