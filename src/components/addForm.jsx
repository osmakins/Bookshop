import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form'
import { getGenres } from '../services/fakeGenreService';

class AddForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      num: "",
      rate: ""
    },
    genres: [],
    errors: {}
  }


  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    num: Joi.string().required().label('Number in Stock'),
    rate: Joi.string().required().label('Rate')
  };


  doSubmit = () => {
    console.log('submitted!')
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const genreId = genres._id;
    this.setState({ genreId });

  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('num', 'Num')}
          {this.renderInput('rate', 'Rate')}
          {this.renderButton("Save")}
        </form>
      </div>
    )
  }
}

export default AddForm;