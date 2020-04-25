import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';
import {ReactComponent as UserIcon} from '../icons/User.svg';
import {ReactComponent as SearchIcon} from '../icons/Search.svg';
import {ReactComponent as DiscoverIcon} from '../icons/Discover.svg';

class BottomBar extends Component {

  constructor(props) {
    super(props)

    this.toggleClass= this.toggleClass.bind(this);
    this.state = {
      activeIndex: null
    }
  }

  toggleClass(index, e) {

      this.setState({ activeIndex: index });
  };

  render() {

    return (
      <div className="bottombar">
        <div className="bottombar-wapper">
              <Link to="/feed" className={`bottombar-item-icon ${this.state.activeIndex===0 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 0)}>
                <DiscoverIcon className=""/>
              </Link>
              <Link to="/search" className={`bottombar-item-icon ${this.state.activeIndex===1 ? 'tab-active': ''}`} onClick={this.toggleClass.bind(this, 1)}>
                <SearchIcon className=""/>
              </Link>
              <Link to="/likes" className={`bottombar-item-icon ${this.state.activeIndex===2 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 2)}>
                <LikeIcon className=""/>
              </Link>
              <Link to="/profile" className={`bottombar-item-icon ${this.state.activeIndex===3 ? 'tab-active': ''}`}  onClick={this.toggleClass.bind(this, 3)}>
                <UserIcon className=""/>
              </Link>
              <span className="active-line"></span>
        </div>
      </div>

    );
  }
}

export default BottomBar;
