import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table'


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
      <Table columns={this.columns} data={books} sortColumn={sortColumn} onSort={onSort} />
    );
  }
}

export default BooksTable;