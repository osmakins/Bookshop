import React, { Component } from 'react';

class Counter extends Component {

  state = {
    count: 0
  };

  render() {
    return (
      <React.Fragment>
        <span>{this.countZero()}</span>
        <button>Add</button>
      </React.Fragment>
    );
  }
  countZero() {
    // using object destructuring - set count constant to this.state
    const { count } = this.state;
    return count === 0 ? "Empty" : count;
  }
}

export default Counter;