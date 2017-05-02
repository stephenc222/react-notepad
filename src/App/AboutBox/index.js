import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'

class AboutBox extends Component {
  render () {
    return (
      <div className='aboutBox'>
        <div className="dialog-title">
          <div className="dialog-title--item">About React Notepad</div>
          <div className="dialog-title--item-X" onClick={this.props.handlers.onCancel}>X</div>
        </div>
        <div>
          <p>
            Thanks for checking out React Notepad! This app is an editor for your
            gists, and lets you save, edit, and create new gists just like your local
            text editor for text files. If you have any questions or suggestions, let me know!
          </p>
        </div>
      </div>
    )
  }
}

AboutBox.propTypes = {
  handlers: PropTypes.object.isRequired
}

export default AboutBox