import React from "react";
import "./LogoPageTitle.css";
function LogoPageTitle({ logoSrc, title }) {
  return (
    <>
      <img src={logoSrc} alt="logo" />
      <h2>{title}</h2>
    </>
  );
}
export default LogoPageTitle;
