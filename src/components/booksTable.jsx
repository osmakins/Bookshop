import React, { Component } from 'react';
import Like from './common/like';

class BooksTable extends Component {

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
    const { books, onLike, onDelete } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("rating")}>Rate</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.genre.name}</td>
              <td>{book.numberInStock}</td>
              <td>{book.rating}</td>
              <td><Like liked={book.liked} onToggleLike={() => onLike(book)} /></td>
              <td><button onClick={() => onDelete(book)} className="btn btn-danger btn-sm">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default BooksTable;