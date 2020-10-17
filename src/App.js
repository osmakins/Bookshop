import React from 'react';
import './App.css';
import NavBar from './components/navbar'
import Books from "./components/books";
import { Route, Redirect, Switch } from "react-router-dom";
import Readers from './components/readers';
import Borrowals from './components/borrowals';
import NotFound from './components/notFound';


function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="jumbotron"></div>
      <main className="container">
        <Switch>
          <Route path="/books" component={Books}></Route>
          <Route path="/readers" component={Readers}></Route>
          <Route path="/borrowals" component={Borrowals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/books" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
