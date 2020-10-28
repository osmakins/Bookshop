import React from 'react';
import NavBar from './components/navbar'
import Books from "./components/books";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Readers from './components/readers';
import Borrowals from './components/borrowals';
import NotFound from './components/notFound';
import BookForm from './components/bookForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <div className="jumbotron"></div>
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/books/:id" component={BookForm} />
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
