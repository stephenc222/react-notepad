import React, { Component } from 'react'
import './index.css'


class FindBox extends Component {

  componentDidMount () {
    this.findInput.focus()
  }
  render () {
    return (
      <div className='findBox'>
        <label>
              Find:
              <input 
                type="text" 
                name="findInFile"
                ref={(input) => { this.findInput = input }}
                value={this.props.findInFile} 
                onChange={this.props.handlers.onChange}/>
        </label>
      </div>
    )
  }
}

export default FindBox