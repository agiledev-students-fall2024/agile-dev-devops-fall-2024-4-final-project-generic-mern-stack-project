import { useState } from 'react'
import CommunityPopup from './CommunityPopup'
//import './SubCommunity.css'
import { FaPlusCircle } from "react-icons/fa";

const SubCommunity = (props) => {
    const [isOpen, setStatus] = useState(false)

    const openOrClose = () => {
        setStatus(!isOpen)
    }

    return (
        <div className="w-[100%] flex flex-col justify-center items-center p-6 bg-lavender_blush-900 rounded-lg shadow-md shadow-ebony-900 gap-6">
            <div className="flex justify-end w-[100%] mb-6">
                <button className="bg-ebony-700 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2" onClick={openOrClose}>Join <FaPlusCircle /></button>
            </div>

            <div className="popup">
                <CommunityPopup isOpen={isOpen} close={openOrClose}/>
            </div>

            <img className="rounded-full w-[35%] ring-[6px] ring-rose-700" src={props.image} alt="group logo"/>

            <h2 className="text-lg font-bold text-ebony-600">{props.name}</h2>
            <p className="text-md text-ebony-700 p-4">{props.description}</p>
        </div>
    )
}

export default SubCommunity