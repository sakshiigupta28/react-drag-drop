import React from "react";
import "./styles.scss";
import GlobalBtn from "../GlobalBtn";

const Modal = ({
  closeModal,
  columnId,
  title,
  desc,
  handleFormInput,
  handleSubmit,
  error,
  editCardIndex,
}) => {
  console.log(editCardIndex, "editCardIndex");
  return (
    <div className="modal_div">
      <div className="title_div">
        <div className="title">
          <input
            type="text"
            placeholder="Enter title here"
            name="title"
            value={title}
            onChange={handleFormInput}
          />
        </div>
        {error === 1 && (
          <p
            style={{ color: "red", marginBottom: "0.75rem", fontSize: "12px" }}
          >
            *Title is required
          </p>
        )}
      </div>
      <div className="desc_div">
        <div className="desc">
          <textarea
            placeholder="Enter descripition here"
            name="desc"
            value={desc}
            onChange={handleFormInput}
          />
        </div>
        {error === 2 && (
          <p
            style={{ color: "red", marginBottom: "0.75rem", fontSize: "12px" }}
          >
            *Characters should be more than 25 
          </p>
        )}
      </div>{" "}
      <div className="modal_btn">
        <GlobalBtn text="Close Modal" btnAction={() => closeModal()} />{" "}
        <GlobalBtn
          text={editCardIndex !== null ? "Edit Card" : "Add Card"}
          btnAction={() => handleSubmit(columnId)}
        />
        
      </div>
    </div>
  );
};

export default Modal;
