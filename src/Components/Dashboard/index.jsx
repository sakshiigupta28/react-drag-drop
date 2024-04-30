import React, { useEffect, useState } from "react";
import "./styles.scss";
import GlobalBtn from "../GlobalBtn";
import AddCard from "../AddCard";
import Modal from "../Modal";
import EditCard from "../EditCard";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editCardIndex, setEditCardIndex] = useState(null);
  const [columnData, setColumnData] = useState({
    colCardOne: [],
    colCardTwo: [],
    colCardThree: [],
  });
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const { title, desc } = formData;

  const columns = ["colCardOne", "colCardTwo", "colCardThree"];

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("columnData"));
    if (storedData) {
      setColumnData(storedData);
    }
  }, []); // Empty dependency array to run only once when component mounts

  useEffect(() => {
    localStorage.setItem("columnData", JSON.stringify(columnData));
  }, [columnData]); // Saving columnData to localStorage whenever it changes

  const handleFormInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addNewCard = (columnId) => {
    setFormData({ id: columnId, title: "", desc: "" });
    setShowModal(true);
    setEditCardIndex(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const saveCard = () => {
    const columnName = columns[formData.id];
    if (editCardIndex !== null) {
      setColumnData((prevData) => ({
        ...prevData,
        [columnName]: prevData[columnName].map((card, index) =>
          index === editCardIndex ? formData : card
        ),
      }));
    } else {
      setColumnData((prevData) => ({
        ...prevData,
        [columnName]: [...prevData[columnName], formData],
      }));
    }
    setShowModal(false);
  };

  const editCard = (card, idx) => {
    setEditCardIndex(idx);
    setFormData(card);
    setShowModal(true);
  };

  return (
    <div className="dashboard_div">
      <div className="heading">Dashboard</div>
      <div className="col_layout">
        {columns.map((columnId, columnIndex) => (
          <div className="col" key={columnIndex}>
            <div className="newCardBtn">
              <GlobalBtn
                text="Add New Card"
                btnType="solid"
                btnAction={() => addNewCard(columnIndex)}
              />
            </div>
            {columnData[columnId].map((card, idx) => (
              <AddCard
                key={idx}
                id={idx + 1}
                title={card?.title}
                desc={card?.desc}
                clickAction={() => editCard(card, idx)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="modal_box">
        {showModal && (
          <Modal
            closeModal={closeModal}
            saveCard={saveCard}
            formData={formData}
            title={title}
            desc={desc}
            handleFormInput={handleFormInput}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
