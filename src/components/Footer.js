import React, { Component } from "react";
import {ReactComponent as LogoInverted} from '../icons/logo-inverted.svg';

class Footer extends Component {
  render() {
    return (
      <footer className="footer no@m">
        <div className="container flex-justify">
                <LogoInverted />
                <div className="footnote">©Favbox Beta. Made with love in Madrid during #COVID19 quarantine.</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
