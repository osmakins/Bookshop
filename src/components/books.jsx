import React, { Component } from 'react';
import { getBooks } from '../services/fakeBookService';
import BooksTable from './booksTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import SideBar from './common/sidebar';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';


class Books extends Component {
  state = {
    books: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ books: getBooks(), genres })
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
    this.setState({ selectedGenre: genre, currentPage: 1 })
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  render() {
    const { pageSize, currentPage, selectedGenre, books: allBooks, sortColumn } = this.state;
    const { length: count } = this.state.books;
    if (count === 0)
      return <p>There are no books in the database.</p>;

    const filtered = selectedGenre && selectedGenre._id ? allBooks.filter(m => m.genre._id === selectedGenre._id) : allBooks;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize)

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
          <BooksTable
            books={books}
            sortColumn={sortColumn}
            onLike={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort} />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

export default Books;