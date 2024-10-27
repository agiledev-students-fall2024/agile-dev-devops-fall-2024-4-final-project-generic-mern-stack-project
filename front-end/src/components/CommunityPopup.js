import './CommunityPopup.css'

const CommunityPopup =  ({isOpen, close}) => {
    if (!isOpen){
        return null
    }
    return (
        <div className="Popup-box">
            <div className="content">
                <div className="Content-button">
                    <button className="Close-button" onClick={close}>X</button>
                </div>
                <p className="Popup-text">You have joined the community!</p>
            </div>
        </div>
    )
}

export default CommunityPopup