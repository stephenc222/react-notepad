import React, { Component } from 'react'
import './index.css'


class PrintFileBox extends Component {
  render () {
    return (
      <div className={(this.props.printFileBox.showPrintFileBox) ? 'printFileBox': 'printFileBoxHidden'}>
        <div>Print File</div>
        <div>{'placeholder text'}</div>
      </div>
    )
  }
}

export default PrintFileBox