import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`inline-flex items-center ${containerStyles}`}
    >
      {title}
      {iconRight && <div>{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
