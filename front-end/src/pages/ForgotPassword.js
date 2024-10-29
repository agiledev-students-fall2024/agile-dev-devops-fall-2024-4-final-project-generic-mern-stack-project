import React, { useState } from "react";
import LogoPageTitle from "../components/LogoPageTitle";
// import Logo from "../assets/upload-image-placeholder.png";
import InputField from "../components/InputField";
//import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleSendClick = (e) => {
    e.preventDefault();
    setSubmittedEmail(email);
    console.log(email);
    console.log(submittedEmail);
    console.log("Code sent to", submittedEmail);
  };
  const handleContinueClick = (e) => {
    navigate("/resetpassword");
  };
  return (
    <div className="w-[90%] lg:w-[60%] m-[auto] flex flex-col justify-center items-center gap-6 p-8">
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Forgot Password?" />
      <div className="w-[80%] flex flex-col gap-4">
        <InputField
          inputfieldName="Email"
          inputType="email"
          value={email}
          handleChange={handleEmailChange}
        />

        {/* <button className="submit-eamil-btn" onClick={handleClick}>
          Submit
        </button> */}
      </div>
      <SubmitButton placeholder="Send" handleClick={handleSendClick} />
      {submittedEmail && (
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-ebony-700 font-bold">We sent a code to {submittedEmail}</div>
          <div className="w-[80%] flex flex-row gap-4 justify-evenly items-center">
            <input className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose" type="text" maxLength="1" />
            <input className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose" type="text" maxLength="1" />
            <input className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose" type="text" maxLength="1" />
            <input className="w-[25%] h-16 rounded-md text-center text-2xl font-bold text-rose" type="text" maxLength="1" />
          </div>
          <SubmitButton
            placeholder="Continue"
            handleClick={handleContinueClick}
          />
        </div>
      )}
      <Link className="text-rose underline font-bold hover:text-ebony" to="/login">
        Back to Login
      </Link>
    </div>
  );
}
