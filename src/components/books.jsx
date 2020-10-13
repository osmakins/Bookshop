import React, { Component } from 'react';
import { getBooks } from '../services/fakeBookService';
import Like from './common/like';
import Pagination from './common/pagination';

class Books extends Component {
  state = {
    books: getBooks(),
    currentPage: 1,
    pageSize: 4
  };

  handleDelete = (book) => {
    const books = this.state.books.filter(b => b._id !== book._id);
    this.setState({ books });
  }

  handleLiked = book => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({ books });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  render() {
    const { pageSize, currentPage } = this.state;
    const { length: count } = this.state.books;
    if (count === 0)
      return <p>There are no books in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {count} books in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.genre.name}</td>
                <td>{book.numberInStock}</td>
                <td>{book.rating}</td>
                <td><Like liked={book.liked} onToggleLike={() => this.handleLiked(book)} /></td>
                <td><button onClick={() => this.handleDelete(book)} className="btn btn-danger btn-sm">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange} />
      </React.Fragment>
    );
  }
}

export default Books;