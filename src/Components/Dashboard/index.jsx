import React, { useEffect, useState } from "react";
import "./styles.scss";
import GlobalBtn from "../GlobalBtn";
import AddCard from "../AddCard";
import Modal from "../Modal";
import EditCard from "../EditCard";

const Dashboard = () => {
  const [newCard, setNewCard] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [columnId, setColumnId] = useState("");
  const [colCardOne, setColCardOne] = useState([]);
  const [colCardTwo, setColCardTwo] = useState([]);
  const [colCardThree, setColCardThree] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    desc: "",
  });
  const { title, desc, id } = formData;

  const handleFormInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const columns = ["colCardOne", "colCardTwo", "colCardThree"];

  const addLocalStorage = (columnId) => {
    console.log(columnId, "columnId");
    // columns.forEach((column) => {
    const storedData = localStorage.getItem(columnId);
    const parsedData = storedData ? JSON.parse(storedData) : [];
    localStorage.setItem(columnId, JSON.stringify([...parsedData, formData]));
    // });

    setColCardOne(JSON.parse(localStorage.getItem("colCardOne")));
    setColCardTwo(JSON.parse(localStorage.getItem("colCardTwo")));
    setColCardThree(JSON.parse(localStorage.getItem("colCardThree")));

    setFormData({
      id: "",
      title: "",
      desc: "",
    });
    setNewCard(false);
  };

  useEffect(() => {
    columns.forEach((column) => {
      const storedData = localStorage.getItem(column);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        switch (column) {
          case "colCardOne":
            setColCardOne(parsedData);
            break;
          case "colCardTwo":
            setColCardTwo(parsedData);
            break;
          case "colCardThree":
            setColCardThree(parsedData);
            break;
          default:
            break;
        }
      }
    });
  }, []);

  const addNewCard = (id) => {
    setColumnId(id);
    setNewCard(true);
  };

  const closeModalClick = () => {
    setNewCard();
  };

  const edit = (card) => {
    console.log(card, "cnuhu");
    setFormData({
      title: card.title,
      desc: card.desc,
    });
    setEditCard(true);
  };

  console.log(formData);
  return (
    <div className="dashboard_div">
      <div className="heading">Dashboard</div>
      <div className="col_layout">
        <div className="col">
          <div className="newCardBtn">
            <GlobalBtn
              text="Add New Card"
              btnType="solid"
              btnAction={() => addNewCard(columns[0])}
            />
          </div>
          {colCardOne?.map((card, idx) => (
            <AddCard
              id={idx + 1}
              title={card?.title}
              desc={card?.desc}
              clickAction={() => edit(card)}
            />
          ))}
        </div>
        <div className="col">
          <div className="newCardBtn">
            <GlobalBtn
              text="Add New Card"
              btnType="solid"
              btnAction={() => addNewCard(columns[1])}
            />
          </div>

          {colCardTwo?.map((card, idx) => (
            <AddCard
              id={idx + 1}
              title={card?.title}
              desc={card?.desc}
              clickAction={() => edit(card)}
            />
          ))}
        </div>
        <div className="col">
          <div className="newCardBtn">
            <GlobalBtn
              text="Add New Card"
              btnType="solid"
              btnAction={() => addNewCard(columns[2])}
            />
          </div>

          {colCardThree?.map((card, idx) => (
            <AddCard
              id={idx + 1}
              title={card?.title}
              desc={card?.desc}
              clickAction={() => edit(card)}
            />
          ))}
        </div>
      </div>{" "}
      <div className="modal_box">
        {newCard && (
          <Modal
            closeModalClick={closeModalClick}
            addLocalStorage={addLocalStorage}
            formData={formData}
            setFormData={setFormData}
            title={title}
            desc={desc}
            handleFormInput={handleFormInput}
            columns={columns}
            columnId={columnId}
          />
        )}
        {editCard && (
          <EditCard
            setEditCard={setEditCard}
            addLocalStorage={addLocalStorage}
            colCardOne={colCardOne}
            colCardTwo={colCardTwo}
            colCardThree={colCardThree}
            title={title}
            desc={desc}
            handleFormInput={handleFormInput}
            columns={columns}
            columnId={columnId}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
      {/* <GlobalBtn text="clear" btnAction={localStorage.clear()} /> */}
    </div>
  );
};

export default Dashboard;
