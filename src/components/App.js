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
    // pop up dialog    
    // set document content to empty
    console.log(`fileNewMenu is clicked here`)
    //console.log(menuItem)
  }

  fileOpenMenu (menuItem) {
    // display all of your gists
    // invoke local file system
    // hint: fileInput element type === 'file'
    console.log(`fileOpenMenu is clicked here`)
    console.log(menuItem)
  }

  fileSaveMenu (menuItem) {
    // save to your gists
    console.log(`fileSaveMenu is clicked here`)
    console.log(menuItem)
  }
  fileSaveAsMenu (menuItem) {
    // ask you for different name and where to save it
    console.log(`fileSaveAsMenu is clicked here`)
    console.log(menuItem)
  }
  // pageSetUpMenu (menuItem) {
  //   // 
  //   console.log(`pageSetUpMenu is clicked here`)
  //   console.log(menuItem)
  // }

  // NOTE: possibly pull out printing all together...
  printMenu (menuItem) {
    console.log(`printMenu is clicked here`)
    console.log(menuItem)
  }
  exitNotepad (menuItem) {
    // close the tab -> DO NOT close window
    // or navigate to user's homepage
    console.log(`exitNotepad is clicked here`)
    console.log(menuItem)
  }

  editUndo (menuItem){
    // undo last action
  }

  editCut  (menuItem){
    // virtual clipboard cut (this application specific)
    // BONUS: native operating system clipboard
  }

  editCopy (menuItem){
    // virtual clipboard copy 
    // ditto
  }

  editPaste (menuItem){
    // virtual clipboard paste
  }

  editDelete  (menuItem) {
    // delete selection
  }

  editFind (menuItem) {
    // open up Find dialog, then finds character sequence 
  }

  editFindNext (menuItem) {
    // finds next occurrence of current selection
  }

  editReplace (menuItem) {
    // open up find and replace dialog
  }

  editGoTo (menuItem) {
    // goes to specific line number if word wrap NOT selected
  }

  editSelectAll (menuItem) {
    // select all text
  }

  editTimeDate (menuItem) {
    // inputs current time stamp at current cursor position
  }

  FormatWordWrap (menuItem) {
    // wraps text to fit inside current viewable area
  }

  FormatFont  (menuItem) {
    // change font of entire text including font type, font style type, and font size 
    // also includes "Script Type:", which includes "Western", "Greek", "Turkish", etc.,
  }

  viewStatusBar (menuItem) {
    // if word Wrap NOT checked, then creates a bottom display of 
    // where the cursor is, e.g., "Ln 11, Col 17"
    // displays checked box also
  }

  helpViewHelp (menuItem) {
    // opens up new searchable help tab 
  }

  helpAboutNotepad (menuItem) {
    // basic about this application stuff
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
