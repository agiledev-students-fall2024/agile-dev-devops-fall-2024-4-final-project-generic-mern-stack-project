import React, { useEffect, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaCommentDots, FaUser, FaPen, FaCode, FaDoorClosed, FaDoorOpen, FaMeetup } from 'react-icons/fa';
import { MdScreenShare } from 'react-icons/md';
import VideoBox from "../components/VideoBox";
import { useNavigate } from 'react-router-dom';
import '../assets/meeting.css';

import Chat from "../components/Chat";
import CodeEditor from "../components/CodeEditor";
import Whiteboard from "../components/Whiteboard";

function MeetingPage() {
    const navgiate = useNavigate();

    const [isMuted, setIsMuted] = React.useState(false);
    const [isCameraOff, setIsCameraOff] = React.useState(true);

    const [userStream, setUserStream] = React.useState(null);

    const [chatVisible, setChatVisible] = React.useState(true);

    const [editorVisible, setEditorVisible] = React.useState(false);
    const [whiteboardVisible, setWhiteboardVisible] = React.useState(false);
    const [screenshareVisible, setScreenshareVisible] = React.useState(false);
    const [videoVisible, setVideoVisible] = React.useState(true);

    const toggleAudio = () => {
        setIsMuted(!isMuted);
    };

    const toggleVideo = () => {
        if (userStream) {
            const videoTracks = userStream.getVideoTracks();
            console.log('Video tracks:', videoTracks);
            console.log('camera off previously:', isCameraOff);
            videoTracks.forEach(track => {
                track.enabled = isCameraOff;
                console.log(`Track ${track.label} enabled: ${track.enabled}`);
            });
        }
        setIsCameraOff(!isCameraOff);
    };

    const toggleChat = () => {
        setChatVisible(!chatVisible);
    };

    const toggleMeeting = () => {
        setVideoVisible(true);
        setWhiteboardVisible(false);
        setEditorVisible(false);
        setScreenshareVisible(false);
    };

    const toggleWhiteboard = () => {
        setWhiteboardVisible(true);
        setEditorVisible(false);
        setScreenshareVisible(false);
        setVideoVisible(false);
    };

    const toggleScreenshare = () => {
        setScreenshareVisible(true);
        setWhiteboardVisible(false);
        setEditorVisible(false);
        setVideoVisible(false);
    };

    const toggleEditor = () => {
        setEditorVisible(true);
        setWhiteboardVisible(false);
        setScreenshareVisible(false);
        setVideoVisible(false);
    };

    const handleLeave = () => {
        navgiate('/home');
    };

    const setSelfVideoAudioConnection = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });
        stream.getTracks().forEach(track => {
            track.enabled = !isCameraOff
            console.log(`Track ${track.label} enabled: ${track.enabled}`);
        });
        setUserStream(stream);
    }
    useEffect(() => {
        setSelfVideoAudioConnection();
    }, []);







    return (
        <div className="flex meeting-container">

            <div className={`flex flex-col w-full bg-grey-900`}>
                <div className="flex bg-grey-900">
                    {/* Video Box for "other guy" at the top */}
                    <div className="h-[90vh] w-full">
                        {
                            videoVisible &&
                            <VideoBox
                                mediaSource={userStream}
                                displayName={"You"}
                                videoOn={!isCameraOff}
                                audioOn={!isMuted}
                                flipHorizontal={true}
                            />
                        }
                        {
                            editorVisible &&
                            <CodeEditor />
                        }
                        {
                            whiteboardVisible &&
                            <Whiteboard />
                        }
                    </div>
                    <div className="absolute top-20 right-4 w-64 h-48">
                        <VideoBox
                            mediaSource={userStream}
                            displayName={"other guy"}
                            videoOn={!isCameraOff}
                            audioOn={false}
                            flipHorizontal={true}
                            collapsible={true}
                        />
                    </div>

                </div>
                {/* nav bar */}
                <div className="bg-gray-700 rounded-xl px-4 flex self-end justify-between items-center w-full shadow-md">
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
                        <NavBarButton icon={FaUser} text="Meeting" onClick={toggleMeeting} />
                        <NavBarButton icon={FaPen} text="Whiteboard" onClick={toggleWhiteboard} />
                        <NavBarButton icon={FaCode} text="Code" onClick={toggleEditor} />
                        <NavBarButton icon={MdScreenShare} text="Screenshare" onClick={toggleScreenshare} />
                    </div>
                    <div className="flex">
                        <NavBarButton icon={FaDoorOpen} text="Leave" onClick={handleLeave} color={'red-500'} />
                    </div>

                </div>
            </div>
            <div className={`transition-all duration-300 ${chatVisible ? 'w-3/10' : 'w-0'} h-full bg-gray-900 overflow-y-auto`}>
                {chatVisible && <Chat />}
            </div>
        </div>
    );
}

const NavBarButton = ({ icon: Icon, text, onClick, color }) => {
    return (
        <div className="flex flex-col text-white mx-2">
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
