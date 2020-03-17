import React, { Component } from "react";

class Button extends Component {
  render() {

    return (

      <div className="drop-overlay">
        {this.state.readings.map((topics, key) =>
          <li key={key}>{topics.topic}</li>
        )}
      </div>



    );
  }
}

export default Button;
