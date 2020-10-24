import Joi from 'joi-browser';
import React from 'react';
import { getBook, saveBook } from '../services/fakeBookService';
import { getGenres } from '../services/fakeGenreService';
import Form from './common/form';

class BookForm extends Form {

  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      rating: ""
    },

    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).label("Number in Stock"),
    rating: Joi.number().required().min(0).max(10).label("Rate")
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const bookId = this.props.match.params.id;
    if (bookId === "add") return;

    const book = getBook(bookId);
    if (!book) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(book) })
  }

  mapToViewModel(book) {
    return {
      _id: book._id,
      title: book.title,
      genreId: book.genre._id,
      numberInStock: book.numberInStock,
      rating: book.rating
    }
  }

  doSubmit = () => {
    saveBook(this.state.data);

    this.props.history.push("/books");
  }

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Book Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("rating", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;