import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form'

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  }


  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name')
  };





  doSubmit = () => {
    console.log('submitted!')
  }




  // componentDidMount() {
  //   this.username.current.focus();
  // }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton("SignUp", "primary")}
        </form>
      </div>
    )
  }
}

export default RegisterForm;