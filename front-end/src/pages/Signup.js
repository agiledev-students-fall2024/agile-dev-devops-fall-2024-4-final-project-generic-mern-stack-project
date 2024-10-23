import React from "react";
import "./Signup.css";
import LogoPageTitle from "../components/LogoPageTitle";
import Logo from "../assets/upload-image-placeholder.png";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <LogoPageTitle logoSrc={Logo} title="Create an account" />
      <InputField inputfieldName="Name" />
      <InputField inputfieldName="Username" />
      <InputField inputfieldName="Email" inputType="email" />
      <InputField inputfieldName="Password" inputType="password" />
      <SubmitButton placeholder="Submit" link="/" />
      <div className="have-account">
        Already have an account?{" "}
        <Link className="underlined" to="/login">
          Login
        </Link>
      </div>
    </>
  );
}
