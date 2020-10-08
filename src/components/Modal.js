import React, { Component } from "react";

class Modal extends Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if(!this.props.show){
        return null;
    }
    return (
      <div className="modal">
        <div className="modal-content text-center">
          <div className="close" onClick={this.onClose}> &times; </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
