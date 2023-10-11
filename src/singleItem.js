import React from "react";

export default function SingleItem({ items, deleteItem, editItem }) {
  const listItem = items;

  return (
    <div className="addedItem-container">
      {listItem.map((item) => {
        return (
          <div key={item.id} className="list-item">
            <input type="checkbox" className="checkbox" />
            <p className="item-name">{item.title}</p>
            <div className="button-container">
            <button onClick={() => editItem(item.id)} className="edit-item-btn">
              Edit
            </button>
            <button
              onClick={() => deleteItem(item.id)}
              className="delete-item-btn"
            >
              delete
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
