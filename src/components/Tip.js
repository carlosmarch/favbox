import React, { Component } from "react";
import {ReactComponent as BulbIcon} from '../icons/Bulb.svg';
import {ReactComponent as RandomIcon} from '../icons/Random.svg';

class Tip extends Component {
  constructor() {
    super();
    this.state = {
      message : this.getTipMessage()
    };
  }
  getTipMessage(){
    var r = Math.floor(Math.random() * 4);
    switch(r){
      case 0:
        return 'You can share a book that you loved in the past';
        break;
      case 1:
        return 'You can share a movie that made you think';
        break;
      case 2:
        return 'You can share a podcast that helps you in the morning';
        break;
      case 3:
        return 'You can share an album that made you jump';
        break;
      case 4:
        return 'You can share a magazine that opened your eyes';
        break;
      default:
        return 'You can share a book that you loved in the past';
        break;
    }
  }
  getRandomMessage = () => {
    this.setState({ message: this.getTipMessage() })
  }

  render() {
    return (
      <div className={`${this.props.className} mb-s`}>
        <div className="tip" onClick={this.getRandomMessage }>
          <div className="tip-icon"><BulbIcon className="icon-16"/></div>
          <div className="tip-message"><strong>Tip:</strong> {this.state.message}</div>
          <RandomIcon id="randomIcon" className="icon-16 random-icon"/>
        </div>
      </div>
    );
  }
}

export default Tip;
