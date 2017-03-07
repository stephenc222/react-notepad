import React, { Component } from 'react'
// also import PropTypes
import MainMenu from './MainMenu'
import mainMenuData from './mainMenuData'
import NotePad from './Notepad'
//import StatusBar from './StatusBar'
import './index.css'

const mockData = [
  'Testing this App text input area',
  'This is the second line',
  'And a third line of more text also',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]

const CURSOR_HOME = { row: 0, column: 0}

const KEY = {
  END: 35,
  HOME: 36,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13
}

const CURSOR_KEYS = [
  KEY.UP,
  KEY.DOWN,
  KEY.LEFT,
  KEY.RIGHT
]

class App extends Component {
  constructor () {
    super()
    // menu items here 
    this.onMainMenuClick = this.onMainMenuClick.bind(this)    
    this.toggleFileMenu = this.toggleFileMenu.bind(this)
    this.toggleEditMenu = this.toggleEditMenu.bind(this)
    this.toggleFormatMenu = this.toggleFormatMenu.bind(this)
    this.toggleViewMenu = this.toggleViewMenu.bind(this)
    this.toggleHelpMenu = this.toggleHelpMenu.bind(this)
    
    this.state = {
      mainMenuData,
      pageContent: ''
    }
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
    console.log('hey, this runs inside toggleFileMenu!')
  }

  toggleEditMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[1].subLevel.visible = !prevState.mainMenuData.topLevel.items[1].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleEditMenu!')
  }

  toggleFormatMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[2].subLevel.visible = !prevState.mainMenuData.topLevel.items[2].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleFormatMenu!')
  }

  toggleViewMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[3].subLevel.visible = !prevState.mainMenuData.topLevel.items[3].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleViewMenu!')
  }

  toggleHelpMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[4].subLevel.visible = !prevState.mainMenuData.topLevel.items[4].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleHelpMenu!')
  }

  fileNewMenu (menuItem) {
    // pop up dialog    
    // set document content to empty
    console.log(`fileNewMenu is clicked here`)
    console.log(menuItem)
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
  pageSetUpMenu (menuItem) {
    // page set up for print, *may* take out
    console.log(`pageSetUpMenu is clicked here`)
    console.log(menuItem)
  }

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
    console.log('editUndo clicked here')
    console.log(menuItem)
            
  }

  editCut  (menuItem){
    // virtual clipboard cut (this application specific)
    // BONUS: native operating system clipboard
    console.log('editCut clicked here')        
    console.log(menuItem)    
  }

  editCopy (menuItem){
    // virtual clipboard copy 
    // ditto
    console.log('editCopy clicked here')   
    console.log(menuItem)         
  }

  editPaste (menuItem){
    // virtual clipboard paste
    console.log('editPaste clicked here')   
    console.log(menuItem)         
  }

  editDelete  (menuItem) {
    // delete selection
    console.log('editDelete clicked here')   
    console.log(menuItem)         
  }

  editFind (menuItem) {
    // open up Find dialog, then finds character sequence 
    console.log('editFind clicked here')  
    console.log(menuItem)          
  }

  editFindNext (menuItem) {
    // finds next occurrence of current selection
    console.log('editFindNext clicked here')  
    console.log(menuItem)          
  }

  editReplace (menuItem) {
    // open up find and replace dialog
    console.log('editReplace clicked here')  
    console.log(menuItem)          
  }

  editGoTo (menuItem) {
    // goes to specific line number if word wrap NOT selected
    console.log('editGoTo clicked here')     
    console.log(menuItem)       
  }

  editSelectAll (menuItem) {
    // select all text
    console.log('editSelectAll clicked here')  
    console.log(menuItem)          
  }

  editTimeDate (menuItem) {
    // inputs current time stamp at current cursor position
    console.log('editTimeDate clicked here')  
    console.log(menuItem)        
  }

  formatWordWrap (menuItem) {
    // wraps text to fit inside current viewable area
    console.log('formatWordWrap clicked here')  
    console.log(menuItem)          
  }

  formatFont  (menuItem) {
    // change font of entire text including font type, font style type, and font size 
    // also includes "Script Type:", which includes "Western", "Greek", "Turkish", etc.,
    console.log('formatFont clicked here') 
    console.log(menuItem)       
  }

  viewStatusBar (menuItem) {
    // if word Wrap NOT checked, then creates a bottom display of 
    // where the cursor is, e.g., "Ln 11, Col 17"
    // displays checked box also
    console.log('viewStatusBar clicked here')  
    console.log(menuItem)          
  }

  helpViewHelp (menuItem) {
    // opens up new searchable help tab 
    console.log('helpViewHelp clicked here')   
    console.log(menuItem)     
  }

  helpAboutNotepad (menuItem) {
    // basic about this application stuff
    console.log('helpAboutNotepad clicked here')
    console.log(menuItem)    
  }

  render () {
    return (
      <div className="App">
        <MainMenu 
          menu={this.state.mainMenuData}
          onClick={this.onMainMenuClick}
        />
        <NotePad />
        {/*<StatusBar />*/}
      </div>
    )
  }
}

export default App;
