import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { deleteBook, getBooks } from '../services/bookService';
import BooksTable from './booksTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import SideBar from './common/sidebar';
import { getGenres } from '../services/genreService';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Search from './search';


class Books extends Component {
  state = {
    books: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
    searchItem: "",
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];

    const { data: books } = await getBooks()

    this.setState({ books, genres })
  }

  handleDelete = (book) => {
    const originalBooks = this.state.books;
    const books = this.state.books.filter(b => b._id !== book._id);
    this.setState({ books });
    try {
      deleteBook(book._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted');
      this.setState({ books: originalBooks })
    }

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
    this.setState({ selectedGenre: genre, searchItem: "", currentPage: 1 })
  };

  handleSearch = query => {
    this.setState({ searchItem: query, selectedGenre: null, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {

    const { pageSize, currentPage, selectedGenre, books: allBooks, sortColumn, searchItem } = this.state;

    let filtered = allBooks;
    if (searchItem)
      filtered = allBooks.filter(m =>
        m.title.toLowerCase().startsWith(searchItem.toLowerCase())
      );

    else if (selectedGenre && selectedGenre._id)
      filtered = allBooks.filter(m => m.genre._id === selectedGenre._id);



    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: books }
  }

  render() {
    const { pageSize, currentPage, sortColumn, searchItem } = this.state;
    const { length: count } = this.state.books;
    const { user } = this.props

    if (count === 0)
      return <p>There are no books in the database.</p>;

    const { totalCount, data: books } = this.getPagedData();

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
          {user && <Link className="btn btn-primary" to="/books/add">Add New</Link>}
          <p>Showing {totalCount} books in the database.</p>
          <Search value={searchItem} onChange={this.handleSearch} />
          <BooksTable
            books={books}
            sortColumn={sortColumn}
            onLike={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

export default Books;