import React, { Component } from 'react';


class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, onDelete, onLike } = this.props
    return (
      <thead>
        <tr>{this.props.columns.map(column => (
          <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>{column.label}</th>
        ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;