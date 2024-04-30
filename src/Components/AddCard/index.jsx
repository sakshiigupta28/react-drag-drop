import React from "react";
import "./styles.scss";
import Modal from "../Modal";

const AddCard = ({ title, desc, clickAction, id }) => {
  // const handleDragStart = (e) => {
  //   dragStart(e, id);
  // };

  return (
    <div
      className="card_div"
      onClick={clickAction}
      key={id}
    >
      <div className="title_div">
        {/* <div>{id}</div> */}
        <div className="title">{title}</div>
      </div>
      <div className="desc_div">
        <div className="desc">{desc}</div>
      </div>{" "}
    </div>
  );
};

export default AddCard;
