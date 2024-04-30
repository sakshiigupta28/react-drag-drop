import React from "react";
import "./styles.scss";
import GlobalBtn from "../GlobalBtn";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

const Modal = ({
  closeModal,
  // addLocalStorage,
  columnId,
  columns,
  title,
  desc,
  handleFormInput,
  // formData,x
  saveCard
}) => {
  console.log(columnId, "columnId");

  // const handleFormSubmit = () =>{
  //    setFormData({
  //     ...formData,
  //     id : columnId
  //    })
  //    addLocalStorage(columnId)
  // }
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
      </div>
      <div className="desc_div">
        <div className="desc">
          <textarea
            placeholder="Enter descrpition here"
            name="desc"
            value={desc}
            onChange={handleFormInput}
          />
        </div>
      </div>{" "}
      <div className="modal_btn">
        <GlobalBtn text="Close Modal" btnAction={() => closeModal()} />{" "}
        <GlobalBtn
          text="Add Card"
          btnAction={()=>saveCard(columnId)}
        />
      </div>
    </div>
  );
};

export default Modal;
