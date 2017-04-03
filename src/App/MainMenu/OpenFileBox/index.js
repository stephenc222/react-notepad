import React, { Component } from 'react'
import './index.css'

class OpenFileBox extends Component {
  constructor (props) {
    super(props)
    this.renderGists = this.renderGists.bind(this)
    this.renderEachGistFile = this.renderEachGistFile.bind(this)
  }


  renderGists (gists, index) {
    return (<ul key={index}>{gists.map((file, index) => this.renderEachGistFile(file, index))}</ul>)
  }

  renderEachGistFile (gist, index) {
    return (<li className='gist' key={index} onClick={(event) => this.props.onGistClick(event, gist)}>{gist.name}</li>)
  }

  render () {
    return (
      <div className={(this.props.openFileBox.showOpenFileBox) ? 'openFileBox': 'openFileBoxHidden'}>
        <div>Open Public Gists</div>
        <div>{this.props.openFileBox.gists.files.map(this.renderGists)}</div>
      </div>
    )
  }
}

export default OpenFileBox