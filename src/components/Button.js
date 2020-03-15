import React, { Component } from "react";

class Button extends Component {
  render() {
    const text = 'Hey! Empieza ahora';

    return (

        <div className="button">{text}</div>

    );
  }
}

export default Button;
