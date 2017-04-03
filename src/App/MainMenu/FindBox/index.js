import React, { Component } from 'react'
import './index.css'


class FindBox extends Component {
  render () {
    return (
      <div className={(this.props.findBox.showFindBox) ? 'findBox': 'findBoxHidden'}>
        <div>Find</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default FindBox