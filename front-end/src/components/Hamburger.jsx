// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './HamburgerDropdown.css';

// const Hamburger = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsOpen((prev) => !prev);
//     };

//     return (
//         <div className="hamburger-dropdown">
//             <button className="hamburger" onClick={toggleDropdown}>
//                 &#9776;
//             </button>
//             {isOpen && (
//                 <div className="dropdown-menu">
//                     <ul>
//                         <li><Link to="/home" onClick={() => setIsOpen(false)}>BITEBUDDY</Link></li>
//                         {/* <li><Link to="/challenges" onClick={() => setIsOpen(false)}>Challenges</Link></li> */}
//                         <li><Link to="/record" onClick={() => setIsOpen(false)}>Record Activity</Link></li>
//                         <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Hamburger;
