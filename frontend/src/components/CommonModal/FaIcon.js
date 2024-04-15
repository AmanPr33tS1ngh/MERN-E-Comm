import React from "react";

const FaIcon = ({ icon, size, color }) => {
  return (
    <i
      className={icon}
      style={{ fontSize: size ? size : "24px", color: color ? color : "black" }}
    ></i>
  );
};

export default FaIcon;
