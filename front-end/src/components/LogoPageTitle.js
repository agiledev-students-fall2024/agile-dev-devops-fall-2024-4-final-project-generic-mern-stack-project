import React from "react";
//import "./LogoPageTitle.css";
function LogoPageTitle({ logoSrc, title }) {
  return (
    <>
      <div className="w-[100%] flex flex-col justify-center items-center">
        <img className="w-[60%]" src={logoSrc} alt="logo" />
        <h2 className="text-2xl text-rose mt-[-20px]">{title}</h2>
      </div>
    </>
  );
}
export default LogoPageTitle;
