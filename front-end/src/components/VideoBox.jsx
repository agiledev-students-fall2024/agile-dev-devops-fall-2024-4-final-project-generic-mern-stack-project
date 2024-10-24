import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function VideoBox({ mediaSource, displayName, audioOn, videoOn, flipHorizontal, collapsible }) {
    const videoRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (videoRef.current && mediaSource) {
            videoRef.current.srcObject = mediaSource;
        }
    }, [mediaSource, videoOn, collapsed]); // Added collapsed to ensure video loads back after expanding

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            className={`relative ${collapsed ? 'h-10' : 'h-full'} ${collapsed ? '' : 'border border-black border-solid'}`}
        >
            {collapsible && (
                <div
                    className="absolute top-0 left-0 right-0 bg-gray-700 text-white flex justify-between items-center px-2 py-1 cursor-pointer z-10"
                    onClick={toggleCollapse}
                    style={{ height: '25px' }}  // Adjusted height to make the bar smaller
                >
                    <span className="ml-2">{collapsed ? displayName : ""}</span>
                    <span className="mr-2">
                        {collapsed ? <FaChevronDown /> : <FaChevronUp />}
                    </span>
                </div>
            )}
            {!collapsed && (
                <div className="w-full h-full">
                    {videoOn ? (
                        <video
                            ref={videoRef}
                            className={`w-full h-full object-cover ${flipHorizontal ? 'transform -scale-x-100' : ''}`}
                            autoPlay
                            playsInline
                            muted={audioOn}
                        ></video>
                    ) : (
                        <div className="flex align-center bg-black items-center justify-center h-full">
                            <span>{displayName}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default VideoBox;
