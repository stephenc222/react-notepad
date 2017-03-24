import React, { Component } from 'react'
import './index.css'

class OpenFileBox extends Component {
  constructor (props) {
    super(props)
    this.renderAvailableFiles = this.renderAvailableFiles.bind(this)
    this.renderEachGistFile = this.renderEachGistFile.bind(this)
  }


  renderAvailableFiles (files, index) {
    return (<ul key={index}>{files.map((file, index) => this.renderEachGistFile(file, index))}</ul>)
  }

  renderEachGistFile (file, index) {
    return (<li key={index}>{file}</li>)
  }
  render () {
    return (
      <div className={`fileOpenBox${this.props.openItems.showOpenFileBox ? '': 'Hidden'}`}>
        {console.log(this.props.openItems)}
      </div>
    )
  }
}

export default OpenFileBox