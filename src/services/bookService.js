import http from './httpService';
import { apiUrl } from '../config.json';


const apiEndpoint = apiUrl + '/books';

export function getBooks() {
  return http.get(apiEndpoint)
}

export function getBook(bookId) {
  return http.get(apiEndpoint + '/' + bookId)
}

export function saveBook(book) {

}

export function deleteBook(bookId) {
  return http.delete(apiEndpoint + '/' + bookId);
}