import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Tag, Heart, Layers } from 'react-feather';
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';
import {ReactComponent as UserIcon} from '../icons/User.svg';
import {ReactComponent as SearchIcon} from '../icons/Search.svg';
import {ReactComponent as AppIcon} from '../icons/App.svg';
import {ReactComponent as DiscoverIcon} from '../icons/Discover.svg';

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
                <Link to="/feed" className={`bottombar-item-icon ${this.state.activeIndex===0 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 0)}>
                  <DiscoverIcon className=""/>
                </Link>
              </div>
              <div className="bottombar-item tab-categorias">
                <Link to="/categorias" className={`bottombar-item-icon ${this.state.activeIndex===1 ? 'tab-active': ''}`} onClick={this.toggleClass.bind(this, 1)}>
                  <SearchIcon className=""/>
                </Link>
              </div>
              <div className="bottombar-item tab-favoritos">
                <Link to="/feed" className={`bottombar-item-icon ${this.state.activeIndex===2 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 2)}>
                  <AppIcon className=""/>
                </Link>
              </div>
              <div className="bottombar-item tab-favoritos">
                <Link to="/likes" className={`bottombar-item-icon ${this.state.activeIndex===2 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 2)}>
                  <LikeIcon className=""/>
                </Link>
              </div>
              <div className="bottombar-item tab-favoritos">
                <Link to="/profile" className={`bottombar-item-icon ${this.state.activeIndex===2 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 2)}>
                  <UserIcon className=""/>
                </Link>
              </div>
        </div>
      </div>

    );
  }
}

export default BottomBar;
