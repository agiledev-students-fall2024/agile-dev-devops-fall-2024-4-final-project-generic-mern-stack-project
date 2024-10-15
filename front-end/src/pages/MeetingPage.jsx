import React from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaCommentDots, FaUser, FaPen, FaCode } from 'react-icons/fa';


function MeetingPage() {


    return (
        // navigation bar
        <div className="bg-gray-700 p-4 flex justify-around items-center fixed bottom-0 w-full shadow-md">
            <NavBarButton icon={FaMicrophone} text="Mute" />
            <NavBarButton icon={FaVideo} text="Camera" />
            <NavBarButton icon={FaCommentDots} text="Chat" />
            <NavBarButton icon={FaUser} text="Participants" />
            <NavBarButton icon={FaPen} text="Whiteboard" />
            <NavBarButton icon={FaCode} text="Code" />
        </div>
    );
}

const NavBarButton = ({ icon: Icon, text }) => {
    return (
        <div className="flex flex-col text-white">
            <button className="bg-gray-700 hover:bg-gray-600 rounded-3xl px-3 py-2 mb-1">
                <div className="flex flex-col align-center items-center">
                    <Icon className="text-xl my-2" />
                    <span className="text-xs">{text}</span>
                </div>
            </button>
        </div>
    );
};


export default MeetingPage;