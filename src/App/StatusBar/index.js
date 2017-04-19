import React, { Component } from 'react'
import './index.css'

class StatusBar extends Component {
  render () {
    return (
      <div className="statusBar">
        StatusBar
        <div className="app__status-bar-cursor-data">
          <div className="cursor-line">
            Line: {`${this.props.cursor.row}`}</div>
            {/*Line: {`${this.props.cursor.row + 1}`}</div>*/}
          <div className="cursor-column">
            Column: {`${this.props.cursor.column}`}</div>
        </div>
      </div>
    )
  }
}

export default StatusBar