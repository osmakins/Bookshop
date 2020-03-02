import React from 'react';
import './App.css';
import NavBar from './components/navbar'
import Books from "./components/books"

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="jumbotron"></div>
      <main className="container">
        <Books />
      </main>
    </React.Fragment>
  );
}

export default App;
