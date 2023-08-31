import React, { Component } from "react";
import '../style/_all.scss'

class Modal extends Component {
    render() {
        return (
            <div style={{ display: `${this.props.visible ? 'flex' : 'none'}` }} className="modalStyle">
                <div className="modalContent">
                   {this.props.children}
                </div>
            </div>
        )
    }
}

export default Modal