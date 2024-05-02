import React from "react";
import "./styles.scss";

const GlobalBtn = ({ text, btnType, isColor, btnBorder , btnAction,colorType }) => {

  return (
    <>
      <button
        className={
          btnType === "solid" ? "global_btn solid" : "global_btn highlighted"
        }
        style={{ background: isColor , border:btnBorder, color : colorType}}
        onClick={btnAction}
      >
        <div className="global_btn_text">
          {text}
  
          
        </div>
      </button>
    </>
  );
};

export default GlobalBtn;
