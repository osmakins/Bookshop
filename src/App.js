import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from './components/navbar'
import { ToastContainer } from 'react-toastify';
import Books from "./components/books";
import Readers from './components/readers';
import Borrowals from './components/borrowals';
import NotFound from './components/notFound';
import BookForm from './components/bookForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/common/protectedRoute';
import Logout from './components/logout';
import auth from './services/authService'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';



class App extends Component {

  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({ user })
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <div className="jumbotron"></div>
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/books/:id" component={BookForm} />
            <Route path="/books" render={props => <Books {...props} user={this.state.user} />}></Route>
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

}

export default App;
