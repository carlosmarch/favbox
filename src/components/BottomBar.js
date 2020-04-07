import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Tag, Heart, Layers } from 'react-feather';

class BottomBar extends Component {

  constructor(props) {
    super(props)

    this.toggleClass= this.toggleClass.bind(this);
    this.state = {
      activeIndex: 0
    }
  }

  toggleClass(index, e) {

      this.setState({ activeIndex: index });
  };

  render() {

    return (
      <div className="bottombar">
        <div className="bottombar-wapper">
              <div className="bottombar-item tab-inicio">
                <Link to="/" className={`bottombar-item-icon ${this.state.activeIndex===0 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 0)}>
                  <Layers color="#181818" size={26} />
                </Link>
              </div>
              <div className="bottombar-item tab-categorias">
                <Link to="/categorias" className={`bottombar-item-icon ${this.state.activeIndex===1 ? 'tab-active': ''}`} onClick={this.toggleClass.bind(this, 1)}>
                  <Tag color="#181818" size={26} />
                  </Link>
              </div>
              <div className="bottombar-item tab-favoritos">
                <Link to="/favoritos" className={`bottombar-item-icon ${this.state.activeIndex===2 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 2)}>
                  <Heart color="#181818" size={26} />
                </Link>
              </div>
        </div>
      </div>

    );
  }
}

export default BottomBar;
