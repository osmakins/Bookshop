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

  render() {
    return (
      <React.Fragment>
        <span className={this.getClassBadge()}>{this.countZero()}</span>
        <button onClick={this.handleAddition}>Add</button>
      </React.Fragment>
    );
  }
  getClassBadge() {
    // method for rendering dynamic badge class
    let classBadge = "badge m-2 badge-";
    classBadge += this.state.count === 0 ? "warning" : "primary";
    return classBadge;
  }

  countZero() {
    // using object destructuring - set count constant to this.state
    const { count } = this.state;
    return count === 0 ? "Empty" : count;
  }
}

export default Counter;