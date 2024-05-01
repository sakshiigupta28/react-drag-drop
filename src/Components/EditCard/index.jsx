import React, { useEffect } from "react";
import "./styles.scss";
import GlobalBtn from "../GlobalBtn";

const EditCard = ({
  setEditCard,
  addLocalStorage,
  columnId,
  colCardOne,
  formData,
  setFormData,
  colCardTwo,
  colCardThree,
  title,
  desc,
  handleFormInput,
}) => {

  const getContent = () => {
    if (colCardOne?.length > 0) {
      const lastElement = colCardOne[colCardOne.length - 1];
      setFormData({
        title: lastElement.title,
        desc: lastElement.desc,
      });
    } else {
      setFormData({
        title: title,
        desc: desc,
      });
    }
    if (colCardTwo?.length > 0) {
        const lastElement = colCardTwo[colCardTwo.length - 1];
        setFormData({
          title: lastElement.title,
          desc: lastElement.desc,
        });
      } else {
        setFormData({
          title: title,
          desc: desc,
        });
      }
      if (colCardThree?.length > 0) {
        const lastElement = colCardThree[colCardThree.length - 1];
        setFormData({
          title: lastElement.title,
          desc: lastElement.desc,
        });
      } else {
        setFormData({
          title: title,
          desc: desc,
        });
      }
  };

  console.log(colCardOne, formData, "formData");

  useEffect(() => {
    if (formData) {
      getContent();
    }
  }, []);

  return (
    <div className="edit_card_div">
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
        <GlobalBtn text="Close Modal" btnAction={() => setEditCard(false)} />{" "}
        <GlobalBtn
          text="Add Card"
          btnAction={() => addLocalStorage(columnId)}
        />
      </div>
    </div>
  );
};

export default EditCard;
