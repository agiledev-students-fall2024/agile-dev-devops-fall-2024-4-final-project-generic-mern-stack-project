// users can change name, username, about, email, password and profile picture
import React, { useEffect, useState } from "react";
import TitleAndDescription from "../components/TitleAndDescription";
import "./EditProfile.css";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";
import toast from "react-hot-toast";

function EditProfile() {
  // mock current user data
  // todo: replace with the actual user data from the backend
  // todo: add functions to allow users to change their profile picture
  const currentUser = {
    name: "John Doe",
    userName: "john_doe",
    about: ["I am a software engineer", "I love to code"],
    email: "jd@gmail.com",
    password: "password123",
    profilePic:
      "https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  };
  const [user, setUser] = useState({
    name: currentUser.name,
    userName: currentUser.userName,
    about: currentUser.about,
    profilePic: currentUser.profilePic,
    password: currentUser.password,
    email: currentUser.email,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  // UseEffect for handling file upload
  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axiosInstance
        .post("/upload-profile-pic", formData)
        .then((response) => {
          toast.success("Profile picture uploaded successfully!");
          setUser((prevUser) => ({
            ...prevUser,
            profilePic: `${process.env.REACT_APP_SERVER_HOSTNAME}/${response.data.file.path}`,
          }));
          console.log(response.data.file.path);
        })
        .catch((error) => {
          console.error("Upload error:", error);
          toast.error("Failed to upload profile picture.");
        });
    }
  }, [selectedFile]); // Dependency array includes selectedFile only

  function handleNameChange(e) {
    setUser((prevUser) => ({
      ...prevUser,
      name: e.target.value,
    }));
  }
  function handleUserNameChange(e) {
    setUser((prevUser) => ({
      ...prevUser,
      userName: e.target.value,
    }));
  }
  function handleAboutChange(e) {
    setUser((prevUser) => ({
      ...prevUser,
      about: e.target.value,
    }));
  }
  function handleProfilePicInput(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Update selectedFile state
    }
  }
  // function handleProfilePicInput(e) {
  //   const file = e.target.files[0]; // Get the file from input
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     axiosInstance
  //       .post("/upload-profile-pic", formData)
  //       .then((response) => {
  //         console.log(response.data.file);
  //         console.log(response);
  //         toast.success("Profile picture uploaded successfully!");
  //         // Optionally update user state with new image URL/path
  //         setUser((prevUser) => ({
  //           ...prevUser,
  //           profilePic: response.data.file.path, // Assuming this is how you access the path
  //         }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error("Failed to upload profile picture.");
  //       });
  //   }
  // }
  // function handleProfilePicChange(e) {
  //   const formData = new FormData();
  //   formData.append("file", user.profilePic);
  //   axiosInstance
  //     .post("/upload-profile-pic", user.profilePic)
  //     .then((response) => {
  //       console.log(response);
  //       toast.success("Profile picture uploaded successfully!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Failed to upload profile picture.");
  //     });
  //   console.log(user);
  // }
  function handleEmailChange(e) {
    setUser((prevUser) => ({
      ...prevUser,
      email: e.target.value,
    }));
  }
  function handleSaveChanges(e) {
    e.preventDefault();
    console.log("Save changes: ", user);
    navigate("/profile");
  }

  return (
    <div className="w-[90%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
      <TitleAndDescription
        title="Edit Your Profile"
        description={"Modify account information like your name and email."}
      />

      <div className="flex flex-col justify-center items-center w-[100%] mx-auto gap-2 p-6 rounded-md  md:w-[80%] lg:w-[60%]">
        <h2 className="text-xl text-ebony-600 text-center mb-2">
          <img
            className="profile-pic"
            src={user.profilePic}
            alt="profile pic"
          />

          {/* <button
            className="text-sm font-semibold mt-2 w-[60%] p-1 bg-ebony border-ebony rounded-lg text-rose-700 hover:bg-rose-700 hover:text-ebony hover:border-rose-700 "
            onClick={handleProfilePicInput}
          >
            select image
          </button> */}
        </h2>
        <input type="file" onChange={handleProfilePicInput}></input>
        <div className="w-[80%] flex flex-col gap-4">
          {/* <InputField
            inputfieldName="Profile Picture"
            inputType="file"
            handleChange={handleProfilePicInput}
            inputValue={user.profilePic}
          /> */}
          <InputField
            inputfieldName="Username"
            inputType="text"
            handleChange={handleUserNameChange}
            inputValue={user.userName}
          />
          <InputField
            inputfieldName="Name"
            inputType="text"
            handleChange={handleNameChange}
            inputValue={user.name}
          />
          <InputField
            inputfieldName="Email"
            inputType="email"
            handleChange={handleEmailChange}
            inputValue={user.email}
          />

          {/* user go to resetpassword page to change password */}
          {/* <InputField
            inputfieldName="Password"
            inputType="password"
            handleChange={handlePasswordChange}
            inputValue={user.password}
          /> */}

          <InputField
            inputfieldName="About"
            inputType="textarea"
            handleChange={handleAboutChange}
            inputValue={user.about}
          />
        </div>
      </div>

      <div className="w-[60%] flex justify-center md:w-[40%] lg:w-[30%]">
        <SubmitButton
          placeholder="Save"
          handleClick={handleSaveChanges}
        ></SubmitButton>
      </div>
    </div>
  );
}

export default EditProfile;
