import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'

class StatusBar extends Component {
  render () {
    return (
      <div className={`statusBar${this.props.statusBarVisible ? '':'Hidden'}`}>
        StatusBar
        <div className="app__status-bar-cursor-data">
          <div className="cursor-line">
            Line: {`${this.props.cursor.row}`}
          </div>
            {/*Line: {`${this.props.cursor.row + 1}`}</div>*/}
          <div className="cursor-column">
            Column: {`${this.props.cursor.column}`}
          </div>
          {/*TODO: remove this after index issues solved*/}
          <div className="cursor-index">
            CursorIndex: {`${this.props.cursorIndex}`}
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