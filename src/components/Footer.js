import React, { Component } from "react";
import Button from './Button';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footnote">🌎 En casa se esta muy bien</div>
          <Button />
        </div>
      </footer>
    );
  }
}

export default Footer;
