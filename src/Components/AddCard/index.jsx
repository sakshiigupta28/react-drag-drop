import React from "react";
import "./styles.scss";

const AddCard = ({ title, desc, clickAction, id, draggable, onDragStart }) => {
  return (
    <div
      className="card_div"
      onClick={clickAction}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="title_div">
        <div className="title">{title}</div>
      </div>
      <div className="desc_div">
        <div className="desc">{desc}</div>
      </div>
    </div>
  );
};

export default AddCard;
