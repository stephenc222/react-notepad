import React, { Component } from 'react'

class MainMenu extends Component {
  onMenuSelection(item) {
    console.log(item)
  }
  render () {
    return (
      <ul>
      {this.props.items.map((item, index) => {
      return (
       <li key={index} onClick={() => 
         this.onMenuSelection(item)}>{item.label}</li>
      )
      })}
      </ul>
    )
  }
}

export default MainMenu