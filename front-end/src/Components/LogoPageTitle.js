import React from "react";
import "./LogoPageTitle.css";
function LogoPageTitle({ logoSrc, title }) {
  return (
    <>
      <div className="page-logo">
        <img src={logoSrc} alt="logo" />
      </div>
      <h2 className="title">{title}</h2>
    </>
  );
}
export default LogoPageTitle;
