import React, { Component } from 'react'
import './App.css'
import MainMenu from './MainMenu'
import NotePad from './Notepad'
import mainMenuData from './mainMenuData'

class App extends Component {
  constructor () {
    super()
    // menu items here 
    this.state = {
      mainMenuData
    }
  }
  render () {
    return (
      <div className="App">
        <MainMenu menu={this.state.mainMenuData}/>
        <NotePad />
      </div>
    )
  }
}

export default App;
