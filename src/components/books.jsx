import React, { Component } from 'react';
import { getBooks } from '../services/fakeBookService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import SideBar from './common/sidebar';
import { getGenres } from '../services/fakeGenreService';


class Books extends Component {
  state = {
    books: [],
    currentPage: 1,
    pageSize: 4,
    genres: []
  };

  componentDidMount() {
    this.setState({ books: getBooks(), genres: getGenres() })
  }

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

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre })
  };

  render() {
    const { pageSize, currentPage, selectedGenre, books: allBooks } = this.state;
    const { length: count } = this.state.books;
    if (count === 0)
      return <p>There are no books in the database.</p>;

    const filtered = selectedGenre ? allBooks.filter(m => m.genre._id === selectedGenre._id) : allBooks;

    const books = paginate(filtered, currentPage, pageSize)

    return (
      <div className="row">
        <div className="col-3">
          <SideBar
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} books in the database.</p>
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
              {books.map(book => (
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
          <Pagination itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange} />
        </div>

      </div>
    );
  }
}

export default Books;