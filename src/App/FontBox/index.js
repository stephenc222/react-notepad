import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'


class FontBox extends Component {
  render () {
    return (
      <div className='fontBox'>
        <div className="dialog-title">
          <div className="dialog-title--item">Font</div>
          <div className="dialog-title--item-X" onClick={this.props.handlers.onCancel}>X</div>
        </div>
        <div>{'placeholder text for FontBox'}</div>
      </div>
    )
  }
}

FontBox.propTypes = {
  handlers: PropTypes.object.isRequired
}

export default FontBox