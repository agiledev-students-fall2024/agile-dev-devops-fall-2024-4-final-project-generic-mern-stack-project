import './CommunityPopup.css'

const CommunityPopup = () => {
    return (
        <div className="Popup-box">
            <div className="content">
                <div className="Content-button">
                    <button className="Close-button" onClick={() => console.log("popup disappears")}>X</button>
                </div>
                <p className="Popup-text">You have joined the community!</p>
            </div>
        </div>
    )
}

export default CommunityPopup

//FUTURE USE!!!
// const CommunityPopup = ({isOpen, closePopup}) => {
//     if (!isOpen){
//         return null;
//     }
//     return (
//         <div className="Popup-box">
//             <div className="content">
//                 <button className="Close-button" onClick={closePopup}></button>
//                 <p className="Popup-text">You have joined the community!</p>
//             </div>
//         </div>
//     )
// }