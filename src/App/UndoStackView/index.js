import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'
class UndoStackView extends Component {
  constructor() {
    super()
    this.renderStackItem = this.renderStackItem.bind(this)
  }

  renderStackItem (item, index) {
    return (<div className="undoStack-Item" key={index}>{
      `U-Stack[${index}]: ${JSON.stringify(item)}`}</div>)
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

UndoStackView.propTypes = {
  undoStackObject: PropTypes.array.isRequired
}

export default UndoStackView