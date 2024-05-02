import React, { useEffect, useState } from "react";
import "./styles.scss";
import GlobalBtn from "../GlobalBtn";
import AddCard from "../AddCard";
import Modal from "../Modal";

const Dashboard = () => {
  const [error, setError] = useState(0);
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
  }, []);

  useEffect(() => {
    // Check if columnData is not empty
    const isNotEmpty = Object.values(columnData).some(
      (array) => array.length > 0
    );
    if (isNotEmpty) {
      localStorage.setItem("columnData", JSON.stringify(columnData));
    }
  }, [columnData]);

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

  const handleSubmit = () => {
    if (title === "") {
      console.log("title is empty");
      setError(1);
    } else if (desc.length <= 25) {
      console.log("less th 25 word");
      setError(2);
    } else {
      saveCard();
    }
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
    console.log(card, idx, "card, idx");
    setEditCardIndex(idx);
    setFormData(card);
    setShowModal(true);
  };

  // Function to handle card drag start
  const handleDragStart = (e, card, columnIndex, cardIndex) => {
    console.log(e, card, columnIndex, cardIndex);
    e.dataTransfer.setData(
      "columnData",
      JSON.stringify({ card, columnIndex, cardIndex })
    );
  };

  // Function to handle card drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle card drop
  const handleDrop = (e, columnIndex) => {
    e.preventDefault();
    const droppedCardData = JSON.parse(e.dataTransfer.getData("columnData"));
    console.log(droppedCardData, "hfhgincgu");
    const { card, columnIndex: fromColumnIndex, cardIndex } = droppedCardData;
    console.log(fromColumnIndex, columnIndex, "fromColumnIndex columnIndex");

    if (fromColumnIndex !== columnIndex) {
      const fromColumn = columns[fromColumnIndex];
      const toColumn = columns[columnIndex];

      // Remove card from the original column
      const updatedFromColumn = columnData[fromColumn].filter(
        (_, index) => index !== cardIndex
      );

      // Add card to the new column
      const updatedToColumn = [...columnData[toColumn], card];

      // Update the state
      setColumnData((prevData) => ({
        ...prevData,
        [fromColumn]: updatedFromColumn,
        [toColumn]: updatedToColumn,
      }));
    }
  };

  // const handleDeleteCard = (columnId, cardIndex) => {
  //   const columnName = columns[columnId];
  //   setColumnData((prevData) => ({
  //     ...prevData,
  //     [columnName]: prevData[columnName]?.filter(
  //       (_, index) => index !== cardIndex
  //     ),
  //   }));
  // };

  return (
    <div className="dashboard_div">
      <div className="heading">Dashboard</div>
      <div className="col_layout">
        {columns.map((columnId, columnIndex) => (
          <div
            className="col"
            key={columnIndex}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, columnIndex)}
          >
            <div className="newCardBtn">
              <GlobalBtn
                text="Add New Card"
                btnType="solid"
                btnAction={() => addNewCard(columnIndex)}
              />
            </div>
            {columnData[columnId].map((card, cardIndex) => (
              <div
                key={cardIndex}
                draggable
                onDragStart={(e) =>
                  handleDragStart(e, card, columnIndex, cardIndex)
                }
                onClick={() => editCard(card, cardIndex)}
              >
                <AddCard
                  id={cardIndex}
                  title={card.title}
                  desc={card.desc}
                  // handleDeleteCard={handleDeleteCard}
                  // columnId={columnId}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="modal_box">
        {showModal && (
          <Modal
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            formData={formData}
            title={title}
            desc={desc}
            handleFormInput={handleFormInput}
            error={error}
            editCardIndex={editCardIndex}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
