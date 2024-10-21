import React, { useEffect, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaCommentDots, FaUser, FaPen, FaCode, FaDoorClosed, FaDoorOpen } from 'react-icons/fa';
import VideoBox from "../components/VideoBox";
import { useNavigate } from 'react-router-dom';
import '../assets/meeting.css';

function MeetingPage() {
    const navgiate = useNavigate();

    const [isMuted, setIsMuted] = React.useState(false);
    const [isCameraOff, setIsCameraOff] = React.useState(false);

    const [userStream, setUserStream] = React.useState(null);

    const toggleAudio = () => {
        setIsMuted(!isMuted);
    };

    const toggleVideo = () => {
        setIsCameraOff(!isCameraOff);
    };

    const toggleChat = () => {

    };

    const toggleWhiteboard = () => {

    };

    const toggleEditor = () => {

    };

    const handleLeave = () => {
        navgiate('/home');
    };

    // useEffect(() => {
    //     const initConnection = async () => {
    //         const stream = await navigator.mediaDevices.getUserMedia({
    //             video: true,
    //             audio: false
    //         });
    //         setUserStream(stream);
    //     }
    //     initConnection();
    // }, []);

    useEffect(() => {
        if (userStream) {
            const videoTracks = userStream.getVideoTracks();
            console.log('Video tracks:', videoTracks);
            videoTracks.forEach(track => {
                track.enabled = !isCameraOff;
                console.log(`Track ${track.label} enabled: ${track.enabled}`);
            });
        }
    }, [isCameraOff, userStream]);





    return (
        <div className="meeting-container">
            {/* <div className="h-full w-full bg-grey-900">
                <div className="fixed right-0 top-0">
                    <VideoBox mediaSource={userStream} />
                </div>

            </div> */}
            <div className="bg-gray-700 rounded-xl p-4 flex justify-between items-center fixed left-0 bottom-0 w-full shadow-md">
                <div className="flex">
                    <NavBarButton
                        icon={isMuted ? FaMicrophoneSlash : FaMicrophone}
                        text={"Audio"}
                        onClick={toggleAudio}
                    />
                    <NavBarButton
                        icon={isCameraOff ? FaVideoSlash : FaVideo}
                        text={"Video"}
                        onClick={toggleVideo}
                    />
                </div>
                <div className="flex">
                    <NavBarButton icon={FaCommentDots} text="Chat" onClick={toggleChat} />
                    <NavBarButton icon={FaPen} text="Whiteboard" onClick={toggleWhiteboard} />
                    <NavBarButton icon={FaCode} text="Code" onClick={toggleEditor} />
                </div>
                <div className="flex">
                    <NavBarButton icon={FaDoorOpen} text="Leave" onClick={handleLeave} color={'red-500'} />
                </div>

            </div>
        </div>
    );
}

const NavBarButton = ({ icon: Icon, text, onClick, color }) => {
    return (
        <div className="flex flex-col text-white mx-4">
            <button
                className="bg-gray-700 hover:bg-gray-600 rounded-3xl px-3 py-2 mb-1 active:bg-gray-500 focus:outline-none"
                onClick={onClick}>
                <div className={`flex flex-col align-center items-center`}>
                    <Icon className={`text-xl my-2 text-${color}`} />
                    <span className={`text-xs text-${color}`}>{text}</span>
                </div>
            </button>
        </div>
    );
};

export default MeetingPage;
