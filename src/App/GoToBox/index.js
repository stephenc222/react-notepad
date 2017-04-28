import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'


class GoToBox extends Component {

  componentDidMount () {
    this.findInput.focus()
  }
  render () {
    return (
      <div className='goToBox'>
        <form onSubmit={this.props.handlers.onSubmit}>
        <div>Go To</div>
        <input 
          type="text" 
          name='goToRowNumber'
          ref={(input) => { this.findInput = input }}
          value={this.props.goToRowNumber}
          onChange={this.props.handlers.onChange}
          autoComplete="off"
        />
        </form>
      </div>
    )
  }
}

GoToBox.propTypes = {
  goToRowNumber: PropTypes.any.isRequired
}

export default GoToBox