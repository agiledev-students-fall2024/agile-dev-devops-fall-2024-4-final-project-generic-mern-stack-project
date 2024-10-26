import React, { useState } from "react";
import "./ResetPassword.css";
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
    <>
      <LogoPageTitle
        logoSrc="./seraphim-logo.PNG"
        title="Set New Password"
      ></LogoPageTitle>
      <div className="passwords">
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
      <div className="btn-link-container">
        {/* <Link to="/">
          <button>Reset Password</button>
        </Link> */}
        <SubmitButton
          placeholder="Reset Password"
          handleClick={handleBtnClick}
        />
        <Link to="/login" className="underlined login-link">
          Back to Login
        </Link>
      </div>
    </>
  );
}
