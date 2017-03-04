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
    this.onMainMenuClick = this.onMainMenuClick.bind(this)
    this.state = {
      mainMenuData,
      pageContent: ''
    }
  }

  fileNewMenu (menuItem) {
    console.log(`fileNewMenu is clicked here`)
    console.log(menuItem)
  }

  fileOpenMenu (menuItem) {
    console.log(`fileOpenMenu is clicked here`)
    console.log(menuItem)
  }

  onMainMenuClick (event, menuItem) {
    event.stopPropagation()
    console.warn(menuItem)
    const callback = this[menuItem.onClick]
    callback && callback(menuItem)
  }

  toggleFileMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[0].subLevel.visible = !prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })
  }
  render () {
    return (
      <div className="App">
        <MainMenu 
          menu={this.state.mainMenuData}
          onClick={this.onMainMenuClick}
        />
        <NotePad />
      </div>
    )
  }
}

export default App;
