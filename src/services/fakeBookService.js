import * as genresAPI from "./fakeGenreService";

const books = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Rainbow shades",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Art" },
    numberInStock: 6,
    rating: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: true
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Art of words",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Art" },
    numberInStock: 5,
    rating: 2.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Fiction" },
    numberInStock: 8,
    rating: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Plant Nature",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Science" },
    numberInStock: 7,
    rating: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Photosynthesis",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Science" },
    numberInStock: 7,
    rating: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Chemistry",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Science" },
    numberInStock: 7,
    rating: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Fiction" },
    numberInStock: 7,
    rating: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Fiction" },
    numberInStock: 4,
    rating: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Still Lives",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Art" },
    numberInStock: 7,
    rating: 3.5
  }
];

export function getBooks() {
  return books;
}

export function getBook(id) {
  return books.find(m => m._id === id);
}

export function saveBook(book) {
  let bookInDb = books.find(m => m._id === book._id) || {};
  bookInDb.title = book.title;
  bookInDb.genre = genresAPI.genres.find(g => g._id === book.genreId);
  bookInDb.numberInStock = book.numberInStock;
  bookInDb.rating = book.rating;

  if (!bookInDb._id) {
    bookInDb._id = Date.now().toString();
    books.push(bookInDb);
  }

  return bookInDb;
}

export function deleteBook(id) {
  let bookInDb = books.find(m => m._id === id);
  books.splice(books.indexOf(bookInDb), 1);
  return bookInDb;
}
