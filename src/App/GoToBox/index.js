import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'


class GoToBox extends Component {
  render () {
    return (
      <div className='goToBox'>
        <form onSubmit={this.props.handlers.onSubmit}>
        <div>Go To</div>
        <input 
          type="text" 
          name='goToRowNumber'
          value={this.props.goToRowNumber}
          onChange={this.props.handlers.onChange}
          autoComplete="off"
        />
          <div className="dialog-title--item-X" onClick={this.props.handlers.onCancel}>X</div>
        </form>
      </div>
    )
  }
}

GoToBox.propTypes = {
  goToRowNumber: PropTypes.number.isRequired
}

export default GoToBox