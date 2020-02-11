import React, { Component } from 'react';

class Counter extends Component {

  state = {
    count: 0
  };

  // constructor() {
  //  super();
  //   this.handleAddition = this.handleAddition.bind(this);
  // }

  handleAddition = () => {
    //In the strict mode, the 'this' is not available (undefined) except we bind as commented out above or use an arrow function such this one.
    this.setState({ count: this.state.count + 1 });
  }

  handleSubtraction = () => {
    this.state.count > 0 ?
      this.setState({ count: this.state.count - 1 }) : this.countZero();
  }

  render() {
    return (
      <React.Fragment>
        <span className={this.getClassBadge()}>{this.countZero()}</span>
        <button className='btn btn-success m-2' onClick={this.handleAddition}>Add</button>
        <button className={this.getClassButtonRemove()} onClick={this.handleSubtraction}>Remove</button>
      </React.Fragment>
    );
  }
  getClassBadge() {
    // method for rendering dynamic badge class
    let classBadge = "badge m-2 badge-";
    classBadge += this.state.count === 0 ? "warning" : "primary";
    return classBadge;
  }

  getClassButtonRemove() {
    let classButton = "m-2 btn btn-danger "
    classButton += this.state.count === 0 ? "disabled" : "active";
    return classButton;
  }

  countZero() {
    // using object destructuring - set count constant to this.state
    const { count } = this.state;
    return count === 0 ? "Empty" : count;
  }
}

export default Counter;