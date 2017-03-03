import React, { Component } from 'react'
import './App.css'
import MainMenu from './MainMenu'
import NotePad from './Notepad'
import mainMenuData from './mainMenuData'

class App extends Component {
  constructor () {
    super()
    // menu items here 
    this.toggleFileMenu = this.toggleFileMenu.bind(this)
    this.state = {
      mainMenuData,
      pageContent: ''
    }
  }

  toggleFileMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.fileMenu.visible = !mainMenuData.fileMenu.visible
      return {mainMenuData}
    })
  }
  render () {
    return (
      <div className="App">
        <MainMenu 
          menu={this.state.mainMenuData}
          toggleFileMenu={this.toggleFileMenu}
        />
        <NotePad />
      </div>
    )
  }
}

export default App;
