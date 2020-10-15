import React, { Component } from 'react';
import Like from './common/like';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';

class BooksTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'rating', label: 'Rate' },
    { key: 'like', content: book => <Like liked={book.liked} onToggleLike={() => this.props.onLike(book)} /> },
    { key: 'delete', content: book => <button onClick={() => this.props.onDelete(book)} className="btn btn-danger btn-sm">Delete</button> },
  ]


  render() {
    const { books, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody data={books} columns={this.columns} />
      </table>
    );
  }
}

export default BooksTable;