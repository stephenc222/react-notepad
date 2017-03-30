import React, { Component } from 'react'

class FindBox extends Component {
  render () {
    return (
      <div className={(this.props.openItems.showFindBox) ? 'findBox': 'findBoxHidden'}>
        <div>Find</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default FindBox