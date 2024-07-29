import { useState } from "react";

import "../styles/input.css";

import eyeIcon from "../assets/eye.svg";
import eyeOffIcon from "../assets/eye-off.svg";

export default function Input() {
  const [isPassword, setIsPassword] = useState(true);
  const [eyeClose, setEyeClose] = useState(true);

  const toggleFormat = () => {
    setIsPassword(!isPassword);
    setEyeClose(!eyeClose);
  };

  return (
    <div className="input__wrapper">
      <input
        id="password"
        type={isPassword ? "password" : "text"}
        className="input__field"
        placeholder="Your Password"
      />
      <label htmlFor="password" className="input__label">
        Nivel
      </label>
      <img
        alt="Eye Icon"
        title="Eye Icon"
        src={eyeClose ? eyeOffIcon : eyeIcon}
        className="input__icon"
        onClick={toggleFormat}
      />
    </div>
  );
}
