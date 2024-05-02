import React from "react";
import "./styles.scss";
// import GlobalBtn from "../GlobalBtn";

const AddCard = ({
  title,
  desc,
  clickAction,
  draggable,
  onDragStart,
  // handleDeleteCard,
  // columnId
}) => {
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
      {/* <GlobalBtn
        text='Delete'
        btnAction={() => handleDeleteCard(columnId)}
      /> */}
    </div>
  );
};

export default AddCard;
