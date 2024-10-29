import React, { useState } from "react";
//import "./ResetPassword.css";
import LogoPageTitle from "../components/LogoPageTitle";
import InputField from "../components/InputField";
// import Logo from "../assets/upload-image-placeholder.png";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleConfirmpasswordChange(e) {
    setConfirmpassword(e.target.value);
  }
  function handleBtnClick(e) {
    console.log("Reset new password: ", confirmpassword);
    navigate("/");
  }

  return (
    <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[60%] lg:w-[40%]">
      <LogoPageTitle
        logoSrc="./seraphim-logo.PNG"
        title="Set New Password"
      />
      <div className="w-[80%] flex flex-col gap-4">
        {/* <div className="input-container">
          <label>Password</label>
          <input className="password" type="password"></input>
        </div>
        <div className="input-container">
          <label>Confirm password</label>
          <input className="confirm-password" type="password"></input>
        </div> */}
        <InputField
          inputfieldName="Password"
          inputType="password"
          inputValue={password}
          handleChange={handlePasswordChange}
        />
        <InputField
          inputfieldName="Confirm Password"
          inputType="password"
          inputValue={confirmpassword}
          handleChange={handleConfirmpasswordChange}
        />
      </div>
        {/* <Link to="/">
          <button>Reset Password</button>
        </Link> */}
      <SubmitButton
        placeholder="Reset Password"
        handleClick={handleBtnClick}
      />
      <Link className="text-rose underline font-bold hover:text-ebony" to="/login" >
        Back to Login
      </Link>
    </div>
  );
}
