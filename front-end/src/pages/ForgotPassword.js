import React, { useState } from "react";
import LogoPageTitle from "../components/LogoPageTitle";
// import Logo from "../assets/upload-image-placeholder.png";
import InputField from "../components/InputField";
import "./ForgotPassword.css";
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
    <>
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Forgot Password?" />
      <div className="input-btn-container">
        <InputField
          inputfieldName="Email"
          inputType="email"
          value={email}
          handleChange={handleEmailChange}
        />

        {/* <button className="submit-eamil-btn" onClick={handleClick}>
          Submit
        </button> */}
        <SubmitButton placeholder="Send" handleClick={handleSendClick} />
      </div>
      <div className="code-container">
        {submittedEmail && (
          <>
            <div>We sent a code to {submittedEmail}</div>
            <div className="inputs">
              <input className="code-input" type="text" maxLength="1" />
              <input className="code-input" type="text" maxLength="1" />
              <input className="code-input" type="text" maxLength="1" />
              <input className="code-input" type="text" maxLength="1" />
            </div>
            <SubmitButton
              placeholder="Continue"
              handleClick={handleContinueClick}
            />
          </>
        )}
        <Link className="underlined" to="/login">
          Back to Login
        </Link>
      </div>
    </>
  );
}
