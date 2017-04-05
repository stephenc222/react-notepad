import React, { Component } from 'react'
import './index.css'

class StatusBar extends Component {
  render () {
    return (
      <div className="statusBar">
        StatusBar
        <div className="app__status-bar-cursor-data">
          <div className="cursor-line">Line</div>
          <div className="cursor-column">Column</div>
        </div>
      </div>
    )
  }
}

export default StatusBar