import React, { Component } from 'react'

class GoToBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showGoToBox) ? 'goToBox': 'goToBoxHidden'}>
        <div>Go To</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default GoToBox