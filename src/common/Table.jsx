import React from "react";
import TableBody from "../common/TableBody";
import TableHeader from "../common/TableHeader";

function Table({ columns, sortColumn, onSort, paginatedMovies }) {
  return (
    <table
      style={{ width: "80%" }}
      className="table table-dark table-striped table-hover"
    >
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={paginatedMovies} columns={columns} />
    </table>
  );
}

export default Table;
