import React from 'react';

const SideBar = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {

  return <ul className="list-group">
    {items.map(item => (
      <li onClick={() => onItemSelect(item)}
        key={item[valueProperty]}
        className={item === selectedItem ? "list-group-item active" : "list-group-item"}>
        {item[textProperty]}
      </li>
    ))}
  </ul>;
};

SideBar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}

export default SideBar