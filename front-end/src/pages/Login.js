import React, { useState } from "react";
import InputField from "../components/InputField";
import LogoPageTitle from "../components/LogoPageTitle";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleBtnClick(e) {
    e.preventDefault();
    console.log("Login as: ", username, password);
    navigate("/");
  }

  return (
    <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-4 p-8 md:w-[60%] lg:w-[40%]">
      <LogoPageTitle logoSrc="seraphim-logo.PNG" title="Login" />
      <div className="w-[80%] flex flex-col gap-4">
        <InputField
          className="input"
          inputfieldName="Username"
          inputValue={username}
          handleChange={handleUsernameChange}
        />
        <InputField
          inputfieldName="Password"
          inputType="password"
          inputValue={password}
          handleChange={handlePasswordChange}
        />
      </div>
      <SubmitButton placeholder="Login" link="/" handleClick={handleBtnClick} />
      <Link
        className="text-rose underline font-bold hover:text-ebony"
        to="/forgotpassword"
      >
        I forgot my password
      </Link>
      <div className="text-ebony-700 font-bold text-center">
        Don't have an account?{" "}
        <Link className="text-rose underline hover:text-ebony" to="/signup">
          Create an account
        </Link>
      </div>
    </div>
  );
}