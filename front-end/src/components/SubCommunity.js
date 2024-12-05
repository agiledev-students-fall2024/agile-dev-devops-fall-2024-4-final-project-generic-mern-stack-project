import { useState } from "react";
import CommunityPopup from "./CommunityPopup";
import { FaPlusCircle } from "react-icons/fa";
import { IoNavigateCircleOutline } from "react-icons/io5";
import BackButton from "./BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../axios";

const SubCommunity = (props) => {
  //join and visit button
  const [isJoinedBefore, setIsJoinedBefore] = useState(false);
  const [isOpen, setStatus] = useState(false);
  const [isVisitButton, setIsVisitButton] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const { communityId } = useParams();

  const handleJoinButton = () => {
    // console.log(communityId);
    setStatus(true);
    axiosInstance
      .post(`/join-community/${communityId}`)
      .then((res) => {
        console.log(res.data);
        // toast.success("You successfully joined the community");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setIsJoinedBefore(true);
          // console.log("You have already joined this community");
          // toast.error("You have already joined this community");
        }
        console.log("error in joining community");
        console.error(err);
      });
    setIsJoined(true);
  };

  const closePopup = () => {
    setStatus(false);
    setIsVisitButton(true);
  };

  //back button functionality
  const back = useNavigate();

  const handleBackButton = () => {
    back(-1);
  };

  return (
    <div className="w-[100%] flex flex-col justify-center items-center p-6 bg-lavender_blush-900 rounded-lg shadow-md shadow-ebony-900 relative md:w-[90%] lg:w-[80%]">
      <BackButton backButtonHandler={handleBackButton} />
      <div className="flex justify-end w-[100%] mb-6">
        {!isVisitButton ? (
          <button
            onClick={handleJoinButton}
            className="bg-ebony-700 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2"
          >
            Join <FaPlusCircle />
          </button>
        ) : (
          <Link to={"/home"}>
            <button className="bg-ebony-700 px-4 py-2 rounded-lg font-light text-rose-700 hover:text-ebony-700 hover:bg-rose-700 flex flex-row items-center gap-2">
              Home <IoNavigateCircleOutline className="w-5 h-5" />
            </button>
          </Link>
        )}
      </div>

      {isOpen && isJoined && (
        <CommunityPopup joinedBefore={isJoinedBefore} close={closePopup} />
      )}

      <img
        className="rounded-full w-[35%] ring-[6px] ring-rose-700 mb-10"
        src={props.image}
        alt="group logo"
        onError={(e) => {
          console.error("Image failed to load:", e.target.src);
          e.target.src = "/default_pic.png";
        }}
      />

      <h2 className="text-lg font-bold text-ebony-600">{props.name}</h2>
      <p className="text-md text-ebony-700 p-4">{props.description}</p>
    </div>
  );
};

export default SubCommunity;
