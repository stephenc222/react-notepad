import React, { Component } from 'react'
import './index.css'

class OpenFileBox extends Component {
  constructor (props) {
    super(props)
    this.renderGists = this.renderGists.bind(this)
    this.renderEachGistFile = this.renderEachGistFile.bind(this)
  }

  componentDidMount () {
    this.fileInput.focus()
  }



  renderGists (gists, index) {
    return (<ul key={index}>{gists.map((file, index) => this.renderEachGistFile(file, index))}</ul>)
  }

  renderEachGistFile (gist, index) {
    return (<li className='gist' key={index} onClick={(event) => this.props.onGistClick(event, gist)}>{gist.name}</li>)
  }

  render () {
    return (
      <div className="openFileBox">
        <div className="openFile-title">
          <div className="openFile-title--item">Open Gists</div>
          <div className="openFile-title--item-X" onClick={this.props.handlers.onCancel}>X</div>
        </div>
        <div className="file-container">
          <div>{this.props.userGists.map(this.renderGists)}</div>
        </div>
        <div className="open-file-form-container">
          <form onSubmit={this.props.openFileHandleSubmit}>
            <label>
              File Name:
              <input 
                type="text" 
                ref={(input) => { this.fileInput = input; }}
                value={this.props.openFileName} 
                onChange={this.props.openFileHandleChange}/>
            </label>
            <input type="submit" value="Open" />
            <input type="button" value="Cancel" onClick={this.props.handlers.onCancel}/>            
          </form> 
        </div>
      </div>
    )
  }
}

export default OpenFileBox