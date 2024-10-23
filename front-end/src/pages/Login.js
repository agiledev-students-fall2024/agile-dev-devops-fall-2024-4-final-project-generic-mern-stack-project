import React from "react";
import "./Login.css";
import InputField from "../components/InputField";
import LogoPageTitle from "../components/LogoPageTitle";
import SubmitButton from "../components/SubmitButton";
import Logo from "../assets/upload-image-placeholder.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <LogoPageTitle logoSrc={Logo} title="Welcome Back" />
      <InputField inputfieldName="Username" />
      <InputField inputfieldName="Password" inputType="password" />
      <SubmitButton placeholder="Login" link="/" />
      <Link className="forgot-password underlined" to="forgotpassword">
        I forgot my password
      </Link>
      <div className="dont-have-account">
        Don't have a account?{" "}
        <Link className="underlined" to="signup">
          Create account
        </Link>
      </div>
    </>
  );
}
