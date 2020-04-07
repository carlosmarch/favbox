import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';
import { Tag, Heart, Layers, Hash } from 'react-feather';

class BottomBar extends Component {

  render() {

    return (
      <div className="bottombar">
        <div className="bottombar-wapper">
              <div className="bottombar-item">
                <Link to="/" className="bottombar-item-icon tab-inicio"><Layers color="#181818" size={24} /></Link>
              </div>
              <div className="bottombar-item">
                <div className="bottombar-item-icon"><Hash color="#181818" size={24} /></div>
              </div>
              <div className="bottombar-item">
                <div className="bottombar-item-icon"><Tag color="#181818" size={24} /></div>
              </div>
              <div className="bottombar-item">
                <Link to="/favoritos" className="bottombar-item-icon"><Heart color="#181818" size={24} /></Link>
              </div>
        </div>
      </div>

    );
  }
}

export default BottomBar;
