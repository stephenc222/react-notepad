import React, { Component } from 'react'
import './index.css'

class RedoStackView extends Component {
  constructor() {
    super()
    this.renderStackItem = this.renderStackItem.bind(this)
  }

  renderStackItem (item, index) {
    return (<div className="redoStack-Item" key={index}>{
      `val: ${item[index]} pos: ${JSON.stringify(item.position)}`}</div>)
  }
  render () {
    return (
      <div className="redoStackView">
      <div className="redoStack-Title">
        Redo Stack
      </div>
      <div className="redoStack-container">
        {this.props.redoStackObject.map(this.renderStackItem)}      
      </div>
      </div>
    )
  }
}

export default RedoStackView