import React, { Component } from 'react'
import './index.css'

// TODO: this Component needs to re render based on prop change.
// Currently, this Component I believe is rendered at the same time as all the 
// other Components, but as it stands, this Component is the only Component that
// has data that is dynamically updated via a network response
// so, this needs to detect prop change and re render itself
// **probably need** componentWillReceiveProps(nextProps), but just a guess 
class OpenFileBox extends Component {
  constructor (props) {
    super(props)
    this.renderGists = this.renderGists.bind(this)
    this.renderEachGistFile = this.renderEachGistFile.bind(this)
  }


  renderGists (files, index) {
    return (<ul key={index}>{files.map((file, index) => this.renderEachGistFile(file, index))}</ul>)
  }

  renderEachGistFile (file, index) {
    return (<li key={index}>{file}</li>)
  }


  render () {
    return (
      <div className={`fileOpenBox${this.props.openItems.showOpenFileBox ? '': 'Hidden'}`}>
        <div>Open Public Gists</div>
        {console.log(this.props.openItems.gists.fileNames)}
        <div>{this.props.openItems.gists.fileNames.map(this.renderGists)}</div>
      </div>
    )
  }
}

export default OpenFileBox