import React from 'react';

const BookForm = ({ match, history }) => {
  return (
    <div>
      <h1>Book form id {match.params.id} </h1>
      <button className="btn btn-primary" onClick={() => history.push("/books")}>Save</button>
    </div>
  );
}

export default BookForm;