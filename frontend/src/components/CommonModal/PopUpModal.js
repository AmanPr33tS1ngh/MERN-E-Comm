import React from "react";
import "./CommonModal.css";
import FaIcon from "./FaIcon";

const PopUpModal = ({ msg, success, closeModal }) => {
  return (
    <div className="OuterDiv d-flex-center">
      <div className="innerDiv text-center">
        <div className="closeDiv" onClick={closeModal}>
          <FaIcon icon={"fa fa-close"} />
        </div>
        <div className="d-flex-center" style={{ marginBottom: "10px" }}>
          <div
            className="faDiv"
            style={{ backgroundColor: success ? "green" : "red" }}
          >
            <FaIcon
              icon={success ? "fa fa-check" : "fa fa-close"}
              color={"white"}
            />
          </div>
        </div>
        {msg}
      </div>
    </div>
  );
};
export default PopUpModal;
