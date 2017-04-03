import React, { Component } from 'react'
import './index.css'


class GoToBox extends Component {
  render () {
    return (
      <div className={(this.props.goToBox.showGoToBox) ? 'goToBox': 'goToBoxHidden'}>
        <div>Go To</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default GoToBox