import '../index.css'
import './HamburgerDropdown.css';
import {Link, useLocation} from 'react-router-dom';

import React, { useState, useRef, useEffect } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { BsRecord2 } from "react-icons/bs";
import { PiCookingPot } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { CiMedal } from "react-icons/ci";




function Nav() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='nav'>
            <Footer activeTab={currentPath} />
        </div>
    );
}

function Footer({ activeTab }) {
    return (
        <footer>
            <nav className='navbar'>
                <Link
                    to="/home"
                    className={activeTab === '/home' ? 'active' : ''}
                >
                    <div className='nav-item'>
                        <IoHomeOutline />
                        <span>Home</span>
                    </div>
                </Link>
                <Link
                    to="/recipes"
                    className={activeTab === '/recipes' ? 'active' : ''}
                >
                    <div className='nav-item'>
                        <PiCookingPot />
                        <span>Recipes</span>
                    </div>
                </Link>
                <Link
                    to="/record"
                    className={activeTab === '/record' ? 'active' : ''}
                >
                    <div className='nav-item'>
                        <BsRecord2 />
                        <span>Record</span>
                    </div>
                </Link>
                <Link
                    to="/challenges"
                    className={activeTab === '/challenges' ? 'active' : ''}
                >
                    <div className='nav-item'>
                        <CiMedal />
                        <span>Challenges</span>
                    </div>
                </Link>
                <Link
                    to="/profile"
                    className={activeTab === '/profile' ? 'active' : ''}
                >
                    <div className='nav-item'>
                        <CgProfile />
                        <span>Profile</span>
                    </div>
                </Link>
            </nav>
        </footer>
    );
}

export default Nav