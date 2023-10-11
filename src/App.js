import React from "react";
import SingleItem from "./singleItem";
import "./styles.css";

const getLocalStorage = () => {
  const list = localStorage.getItem("List");
  if (list) {
    return JSON.parse(localStorage.getItem("List"));
  } else {
    return [];
  }
};

export default function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [listItem, setListItem] = React.useState(getLocalStorage());
  const [isEditing, setIsEditing] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [alert, setAlert] = React.useState({
    alerts: false,
    msg: "",
    type: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputValue) {
      setAlertmsg(true, "Please enter value", "danger");
    } else if (isEditing && inputValue) {
      setListItem(
        listItem.map((item) => {
          if (item.id === editId) {
            return { ...item, title: inputValue };
          }
          return item;
        })
      );
      setInputValue("");
      setEditId(null);
      setIsEditing(false);
      setAlertmsg(true, "item updated", "success");
    } else {
      const id = new Date().getTime().toString();
      const newItem = { id: id, title: inputValue };
      setListItem((prevVal) => [...prevVal, newItem]);
      setAlertmsg(true, "item added to the list", "success");
      setInputValue("");
    }
  }
  const setAlertmsg = (alerts = false, msg = "", type = "") => {
    setAlert({ alerts, msg, type });
  };
  const emptyCart = () => {
    setAlertmsg(true, "item list cleared", "danger");
    setListItem([]);
  };

  function deleteItem(id) {
    const newValue = listItem.filter((item) => item.id !== id);
    setListItem(newValue);
    setAlertmsg(true, "item removed", "danger");
  }
  function editItem(id) {
    const specificItem = listItem.find((item) => item.id === id);
    setEditId(specificItem.id);
    setIsEditing(true);
    setInputValue(specificItem.title);
  }
  React.useEffect(() => {
    localStorage.setItem("List", JSON.stringify(listItem));
    const removeAlert = setTimeout(() => {
      setAlertmsg();
    }, 2000);
    return () => clearTimeout(removeAlert);
  }, [listItem]);

  return (
    <div className="grocery-bud-container">
      <div className="msg-container">
        <h3 className={`${alert.type} message`}>{alert.msg}</h3>
      </div>
      <h1>grocery bud</h1>

      <form onSubmit={handleSubmit} className="form-control">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          name="input"
          className={`${!inputValue ? "fill-value" : null}`}
          value={inputValue}
        />
        <button className="add-btn">add item</button>
      </form>
      <SingleItem
        items={listItem}
        deleteItem={deleteItem}
        editItem={editItem}
      />
      {listItem.length > 0 && (
        <button className="clear-list" onClick={emptyCart}>
          Clear list
        </button>
      )}
    </div>
  );
}
