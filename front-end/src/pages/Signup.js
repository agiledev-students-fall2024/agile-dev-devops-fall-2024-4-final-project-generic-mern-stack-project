import React, { useState } from "react";
// import "./Signup.css";
import LogoPageTitle from "../components/LogoPageTitle";
// import Logo from "../assets/upload-image-placeholder.png";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleBtnClick() {
    console.log("signup as: ", name, userName, email, password);
    navigate("/");
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div className="w-[90%] lg:w-[60%] flex flex-col justify-center items-center gap-4 p-8 m-[auto]">
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Create an account" />
      <div className=" w-[80%] flex flex-col justify-center items-center gap-4">
        <InputField inputfieldName="Name" handleChange={handleNameChange} />
        <InputField
          inputfieldName="Username"
          handleChange={handleUsernameChange}
        />
        <InputField
          inputfieldName="Email"
          inputType="email"
          handleChange={handleEmailChange}
        />
        <InputField
          inputfieldName="Password"
          inputType="password"
          handleChange={handlePasswordChange}
        />
      </div>
      <SubmitButton placeholder="Signup" handleClick={handleBtnClick} />
      {/* <div className="btn-container">
        <button className="signup-btn" onClick={handleClick}>
          Signup
        </button>
      </div> */}
      <div className="text-ebony-700 font-bold text-center">
        Already have an account?{" "}
        <Link className="text-rose underline hover:text-ebony" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
