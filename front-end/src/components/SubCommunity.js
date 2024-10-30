import { useState } from 'react'
import CommunityPopup from './CommunityPopup'
import { FaPlusCircle } from "react-icons/fa";
import { IoNavigateCircleOutline } from "react-icons/io5";
import BackButton from './BackButton';
import { Link, useNavigate } from 'react-router-dom';

const SubCommunity = (props) => {
    //join and visit button
    const [isOpen, setStatus] = useState(false)
    const [isVisitButton, setIsVisitButton] = useState(false)

    const handleJoinButton = () => {
        setStatus(true)
    }

    const closePopup =  () => {
        setStatus(false)
        setIsVisitButton(true)
    }

    //back button functionality 
    const back = useNavigate()

    const handleBackButton = () => {
        back(-1)
    }

    return (
        <div className="w-[100%] flex flex-col justify-center items-center p-6 bg-lavender_blush-900 rounded-lg shadow-md shadow-ebony-900 relative md:w-[90%] lg:w-[80%]">
            <BackButton backButtonHandler={handleBackButton}/>
            <div className="flex justify-end w-[100%] mb-6">

                {!isVisitButton ? (
                    <button onClick={handleJoinButton} className="bg-ebony-700 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2">Join <FaPlusCircle /></button>
                ) : (
                    <Link to="/">
                        <button className="bg-ebony-700 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2">Visit <IoNavigateCircleOutline className="w-5 h-5"/></button>
                    </Link>
                )}
                
            </div>

            {isOpen && (
                <CommunityPopup close={closePopup}/>
            )}

            <img className="rounded-full w-[35%] ring-[6px] ring-rose-700 mb-10" src={props.image} alt="group logo"/>

            <h2 className="text-lg font-bold text-ebony-600">{props.name}</h2>
            <p className="text-md text-ebony-700 p-4">{props.description}</p>
        </div>
    )
}

export default SubCommunity