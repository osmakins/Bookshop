import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';
import auth from '../services/authService';


class BooksTable extends Component {
  columns = [
    { path: 'title', label: 'Title', content: book => <Link to={`/books/${book._id}`}>{book.title}</Link> },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'rating', label: 'Rate' },
    { key: 'like', content: book => <Like liked={book.liked} onToggleLike={() => this.props.onLike(book)} /> },

  ]

  deleteColumn = { key: 'delete', content: book => <button onClick={() => this.props.onDelete(book)} className="btn btn-danger btn-sm">Delete</button> }

  constructor() {
    super()
    const user = auth.getCurrentUser();
    if (user && user.isAdmin)
      this.columns.push(this.deleteColumn)
  }

  render() {
    const { books, onSort, sortColumn } = this.props;

    return (
      <Table columns={this.columns} data={books} sortColumn={sortColumn} onSort={onSort} />
    );
  }
}

export default BooksTable;