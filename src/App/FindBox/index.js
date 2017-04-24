import React, { Component } from 'react'
import './index.css'


class FindBox extends Component {

  componentDidMount () {
    this.findInput.focus()
  }
  render () {
    return (
      <div className='findBox'>
        <form onSubmit={this.props.handlers.onSubmit}>
          <label>
            Find:
            <input 
              type="text" 
              name="findInFile"
              ref={(input) => { this.findInput = input }}
              value={this.props.findInFile} 
              onChange={this.props.handlers.onChange}/>
          </label>
          <input type="submit" value="Find Next" />
          <input type="button" value="Cancel" onClick={this.props.handlers.onCancel}/>
        </form> 
      </div>
    )
  }
}

export default FindBox