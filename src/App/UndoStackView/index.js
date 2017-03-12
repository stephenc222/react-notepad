import React, { Component } from 'react'
import './index.css'
class UndoStackView extends Component {
  constructor() {
    super()
    this.renderStackItem = this.renderStackItem.bind(this)
  }

  renderStackItem (item, index) {
    return (<div className="undoStack-Item" key={index}>{
      `val: ${item[index]} pos: ${JSON.stringify(item.position)}`}</div>)
  }
  render () {
    return (
      <div className="undoStackView">
        <div className="undoStack-Title">
          Undo Stack
        </div>
        <div className="undoStack-container">
          {this.props.undoStackObject.map(this.renderStackItem)}
        </div>
      </div>
    )
  }
}

export default UndoStackView