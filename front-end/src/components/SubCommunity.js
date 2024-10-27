import { useState } from 'react'
import CommunityPopup from './CommunityPopup'
import './SubCommunity.css'

const SubCommunity = (props) => {
    const [isOpen, setStatus] = useState(false)

    const openOrClose = () => {
        setStatus(!isOpen)
    }

    return (
        <div className="Sub-community">
            <div className="Community-button">
                <button className="Join-button" onClick={openOrClose}>Join</button>
            </div>

            <div className="popup">
                <CommunityPopup isOpen={isOpen} close={openOrClose}/>
            </div>

            <div className="Group-logo">
                <img className="logo" src={props.image} alt="group logo"/>
            </div>

            <h2 className="name">{props.name}</h2>
            <p className="description">{props.description}</p>
        </div>
    )
}

export default SubCommunity