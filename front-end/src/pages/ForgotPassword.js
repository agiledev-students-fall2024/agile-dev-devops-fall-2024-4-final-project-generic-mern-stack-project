import React, { useState } from "react";
import LogoPageTitle from "../components/LogoPageTitle";
import Logo from "../assets/upload-image-placeholder.png";
import InputField from "../components/InputField";

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [submittedEmail, setSubmittedEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };
  const handleClick = (e) => {
    // console.log(email);
    setSubmittedEmail(email);
  };
  return (
    <>
      <LogoPageTitle logoSrc={Logo} title="Forgot Password?" />
      <InputField
        inputfieldName="Email"
        value={email}
        handleChange={handleEmailChange}
      />
      <button onClick={handleClick}>Submit</button>
      {submittedEmail && <div>We sent a code to {submittedEmail}</div>}
    </>
  );
}
