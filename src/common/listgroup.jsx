import React from "react";

function ListGroup(props) {
  const { items, textProperty, valueProperty, selectedGenre, onItemSelect } =
    props;

  return (
    <ul style={{ margin: "20% 5% 0% 20%" }} className="list-group">
      {items.map((item) => (
        <li
          className={
            item === selectedGenre
              ? "list-group-item active"
              : "list-group-item bg-dark text-light border-light"
          }
          onClick={() => onItemSelect(item)}
          key={item[textProperty]}
        >
          {item[valueProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "_id",
  valueProperty: "name",
};
export default ListGroup;
