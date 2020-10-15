import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';

class BooksTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'rating', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' },
  ]


  render() {
    const { books, onLike, onDelete, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
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