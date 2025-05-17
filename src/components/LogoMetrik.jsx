// LogoMetrik.jsx
import React from "react";
import "./LogoMetrik.css";

const LogoMetrik = ({ size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className="logo-metrik"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stylized M */}
    <path
      d="M15,85 L15,20 Q15,10 25,10 L35,10 Q45,10 45,20 L45,55 Q45,65 55,65 L55,20 Q55,10 65,10 L75,10 Q85,10 85,20 L85,85"
      fill="url(#grad1)"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Dot (the "!") */}
    <circle cx="85" cy="92" r="5" fill="url(#grad2)" stroke="white" strokeWidth="1" />

    {/* Gradient definitions */}
    <defs>
      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#0077ff" />
      </linearGradient>
      <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#0055aa" />
      </radialGradient>
    </defs>
  </svg>
);

export default LogoMetrik;
