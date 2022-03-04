import React from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";

function TableHeader({ columns, sortColumn, onSort }) {
  const renderSort = (column) => {
    const sorte = { ...sortColumn };
    if (column === sorte.path)
      sorte.order = sorte.order === "asc" ? "desc" : "asc";
    else {
      sorte.path = column;
      sorte.order = "asc";
    }

    onSort(sorte);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FaSortUp />;
    return <FaSortDown />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            style={{ cursor: "pointer" }}
            onClick={() => renderSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
