import React, { Component } from 'react'
import './index.css'

class OpenFileBox extends Component {
  constructor (props) {
    super(props)
    this.renderGists = this.renderGists.bind(this)
    this.renderEachGistFile = this.renderEachGistFile.bind(this)
  }


  renderGists (files, index) {
    console.log(files)
    return (<ul key={index}>{files.map((file, index) => this.renderEachGistFile(file, index))}</ul>)
  }
  


  // TODO: add reference to click handler prop here for each gist's raw data url
  // for parsing to then set the state of the Notepad Textarea Component
  // keep state in App, not here

  renderEachGistFile (file, index) {
    //console.log(file)
    return (<li className='gist' key={index} onClick={(event) => console.log('gist was clicked!')}>{file}</li>)
  }



  render () {
    return (
      <div className={`fileOpenBox${this.props.openItems.showOpenFileBox ? '': 'Hidden'}`}>
        <div>Open Public Gists</div>
        <div>{this.props.openItems.gists.fileNames.map(this.renderGists)}</div>
      </div>
    )
  }
}

export default OpenFileBox