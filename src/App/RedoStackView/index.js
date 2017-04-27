import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'
class RedoStackView extends Component {
  constructor() {
    super()
    this.renderStackItem = this.renderStackItem.bind(this)
  }

  renderStackItem (item, index) {
    return (<div className="redoStack-Item" key={index}>{
            `R-Stack[${index}]: ${JSON.stringify(item)}`}</div>)
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

RedoStackView.propTypes = {
  redoStackObject: PropTypes.array.isRequired
}

export default RedoStackView