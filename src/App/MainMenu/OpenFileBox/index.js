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
        <div className="openFile-title">
          <div className="openFile-title--item">Open Gists</div>
          <div className="openFile-title--item-X" onClick={this.props.openFileHandleCancel}>X</div>
        </div>
        <div className="file-container">
          <div>{this.props.openFileBox.gists.files.map(this.renderGists)}</div>
        </div>
        <div className="open-file-form-container">
          <form onSubmit={this.props.openFileHandleSubmit}>
            <label>
              File Name:
              <input type="text" value={this.props.openFileFormValue} onChange={this.props.openFileHandleChange}/>
            </label>
            <input type="submit" value="Open" />
            <input type="button" value="Cancel" onClick={this.props.openFileHandleCancel}/>            
          </form> 
        </div>
      </div>
    )
  }
}

export default OpenFileBox