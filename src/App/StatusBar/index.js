import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'

class StatusBar extends Component {
  render () {
    return (
      <div className={`statusBar${this.props.statusBarVisible ? '':'Hidden'}`}>
        <div className="app__status-bar-cursor-data">
          <div className="cursor-line">
            Line: {`${this.props.cursor.row}`}&nbsp;
          </div>
          <div className="cursor-column">
            Column: {`${this.props.cursor.column}`}&nbsp;
          </div>
          <div className="cursor-index">
            Index: {`${this.props.cursorIndex}`}
          </div>
        </div>
      </div>
    )
  }
}

StatusBar.propTypes = {
  cursor: PropTypes.object.isRequired
}

export default StatusBar