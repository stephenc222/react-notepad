import React, { Component } from 'react'
import 'whatwg-fetch'
// also import PropTypes
import {getGists, saveAsGist, saveGist} from './helpers/Api'
import MainMenu from './MainMenu'
import mainMenuData from './mainMenuData'
import OpenFileBox from './OpenFileBox'

import NotePad from './Notepad'
import StatusBar from './StatusBar'

// components for development purposes
import RedoStackView from './RedoStackView'
import UndoStackView from './UndoStackView'

// For testing GitHub API requests for user-level permission
import myInfo from './mySecretStuff.js'
import './index.css'

const startData = [
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
  constructor (props) {
    super(props)
    // menu items here 
    this.onClickCloseMenuItem = this.onClickCloseMenuItem.bind(this)
    this.onMainMenuClick = this.onMainMenuClick.bind(this)
    this.onNotepadMouseDown = this.onNotepadMouseDown.bind(this)
    this.onNotepadMouseEnter = this.onNotepadMouseEnter.bind(this)
    this.onNotepadMouseLeave = this.onNotepadMouseLeave.bind(this)
    this.onNotepadMouseUp = this.onNotepadMouseUp.bind(this)
    this.isSelected = this.isSelected.bind(this)

    this.toggleFileMenu = this.toggleFileMenu.bind(this)

    this.renderModal = this.renderModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderOpenFileDialog = this.renderOpenFileDialog.bind(this)

    this.onClickSaveYes = this.onClickSaveYes.bind(this)
    this.onClickSaveNo = this.onClickSaveNo.bind(this)
    this.onClickSaveCancel = this.onClickSaveCancel.bind(this)

    this.fileNewMenu = this.fileNewMenu.bind(this)

    this.fileOpenMenu = this.fileOpenMenu.bind(this)
    this.onGistClick = this.onGistClick.bind(this)
    this.openFileHandleChange = this.openFileHandleChange.bind(this)
    this.openFileHandleSubmit = this.openFileHandleSubmit.bind(this)
    this.openFileHandleCancel = this.openFileHandleCancel.bind(this)

    this.fileSaveMenu = this.fileSaveMenu.bind(this)

    this.fileSaveAsMenu = this.fileSaveAsMenu.bind(this)
    this.saveAsHandleChange = this.saveAsHandleChange.bind(this)
    this.saveAsHandleSubmit = this.saveAsHandleSubmit.bind(this)
    this.saveAsHandleCancel = this.saveAsHandleCancel.bind(this)

    this.printMenu = this.printMenu.bind(this)
    this.exitNotepad = this.exitNotepad.bind(this)

    this.toggleEditMenu = this.toggleEditMenu.bind(this)
    this.editUndo = this.editUndo.bind(this)
    this.editRedo = this.editRedo.bind(this)
    this.editFind = this.editFind.bind(this)
    this.editReplace = this.editReplace.bind(this)
    this.editGoTo = this.editGoTo.bind(this)

    this.toggleFormatMenu = this.toggleFormatMenu.bind(this)
    this.formatFont = this.formatFont.bind(this)

    this.toggleViewMenu = this.toggleViewMenu.bind(this)

    this.toggleHelpMenu = this.toggleHelpMenu.bind(this)
    this.viewHelpBox = this.viewHelpBox.bind(this)
    this.helpAboutNotepad = this.helpAboutNotepad.bind(this)

    // key press events here
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)

    this.moveToStartOfLine = this.moveToStartOfLine.bind(this)
    this.moveToEndOfLine = this.moveToEndOfLine.bind(this)
    this.moveToTopOfDocument = this.moveToTopOfDocument.bind(this)
    this.moveToBottomOfDocument = this.moveToBottomOfDocument.bind(this)
    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.insertCarriageReturn = this.insertCarriageReturn.bind(this)
    this.insertBackspace = this.insertBackspace.bind(this)
    this.insertDelete = this.insertDelete.bind(this)
    this.insertCharacter = this.insertCharacter.bind(this)
    // // audio object
    // this.audioContext = new window.AudioContext()
    // this.audioGainNode = this.audioContext.createGain()
    // this.audioGainNode.connect(this.audioContext.destination)
    // this.audioGainNode.gain.value = 0.15

    // // beep sound effect when backspace is pressed and cursor at
    // // the beginning of a line
    // this.beep = () => {
    //   const oscillator = this.audioContext.createOscillator()
    //   oscillator.type = 'square'
    //   oscillator.frequency.value = 120
    //   oscillator.connect(this.audioGainNode)
    //   oscillator.start()
    //   oscillator.stop(this.audioContext.currentTime + 0.15)
    // }
    
    this.state = {
      mainMenuData,
      documentFileName: 'Untitled.txt',
      documentCursor: CURSOR_HOME,
      documentContent: startData,
      documentSelection: {
        isSelected: false,
        // TODO: figure out if this second flag, "isSelectedChanging", is actually necessary
        isSelectedChanging: false,
        selection: null,
        selectionStart: {
          row: 0,
          column: 0
        },
        selectionEnd: {
          row: 0,
          column: 0
        }
      },
      undoStack: [],
      redoStack: [],
      saved: false,
      hasSaved: false,
      showModal: false,
      dialogBoxType: '',
      // showModal: false,
      openFileName: '',
      saveAsFormFileName: '',
      saveAsFormFileDescription: '',
      newSavedGistID: '',
      gistType: 'secret',
      openFileGistID: '',
      openFileGistType: '',
      myGISTS: mainMenuData.topLevel.items[0].subLevel.items[1].gists.files
    }

    //TODO: customize the confirm dialog to prevent or enable reload of browser tab
    // commented out for less aggravation during development
    // window.addEventListener("beforeunload", function (e) {
    //   e.preventDefault()
    //   var confirmationMessage = ''
    //   e.returnValue = confirmationMessage    // Gecko, Trident, Chrome 34+
    //   return confirmationMessage             // Gecko, WebKit, Chrome <34
    // })
  }

  renderModal() {
    const dialogBox = this[this.state.dialogBoxType]
    return (              
      <div className='backdrop__container'>
        {dialogBox && dialogBox()}
      </div>          
    )
  }

  openModal (type) {
    this.setState(
      {
        showModal: true,
        dialogType: type,
      }
    )
  }

  closeModal () {
    this.setState(
      {
        showModal: false,
      }
    )
  }

  renderOpenFileDialog () {
    const handlers = {
      onCancel: this.closeModal,
      // onOpen: this.openFile
    }
            // {...this.state.openFileProps}

    return (
        <div className='dialog-box__container'>
          <OpenFileBox
            handlers={handlers}
            onGistClick={this.onGistClick}
            openFileHandleSubmit={this.openFileHandleSubmit}
            openFileHandleChange={this.openFileHandleChange}
            openFileHandleCancel={this.openFileHandleCancel}
            openFileName={this.state.openFileName}
            openFileBox={this.state.mainMenuData.topLevel.items[0].subLevel.items[1]}
          />
        </div>
      )
  }


  onClickCloseMenuItem (event) {
    const mainMenuData = {...this.state.mainMenuData}

    // no view menu dialog boxes
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items
    const editMenu = mainMenuData.topLevel.items[1].subLevel.items
    const formatMenu = mainMenuData.topLevel.items[2].subLevel.items
    const helpMenu = mainMenuData.topLevel.items[4].subLevel.items

    if (!(event.target).closest('.app__menu-bar-container')) {
      this.setState((prevState) => {
        mainMenuData.topLevel.items[4].subLevel.visible = false
        mainMenuData.topLevel.items[3].subLevel.visible = false
        mainMenuData.topLevel.items[2].subLevel.visible = false
        mainMenuData.topLevel.items[1].subLevel.visible = false
        mainMenuData.topLevel.items[0].subLevel.visible = false
        return {mainMenuData}
      })
    }

    if (fileMenu[1].showOpenFileBox) {
      if (!(event.target).closest('.openFileBox')) {
        console.log('blink!')
        // fileMenu[1].showOpenFileBox = false
        // this.setState({mainMenuData})
        // TODO: make OpenFile box blink, just like in notepad?
      }
    }
    
    if (fileMenu[3].showSaveAsBox) {
      if (!(event.target).closest('.saveAsBox')) {
        // TODO: make OpenFile box blink, just like in notepad?        
        // fileMenu[3].showSaveAsBox = false
        // this.setState({mainMenuData})
        console.log('blink!')
      }
    }
    // if (fileMenu[4].showPrintFileBox) {
    //   if (!(event.target).closest('.printFileBox')) {
    //     fileMenu[4].showPrintFileBox = false
    //     this.setState({mainMenuData})
    //   }
    // }
    // if (fileMenu[5].showExitNotepadBox) {
    //   if (!(event.target).closest('.exitNotepadBox')) {
    //     fileMenu[5].showExitNotepadBox = false
    //     this.setState({mainMenuData})
    //   }
    // }

    // edit submenu dialog boxes
    if (editMenu[6].showFindBox) {
      if (!(event.target).closest('.findBox')) {
        editMenu[6].showFindBox = false
        this.setState({mainMenuData})
      }
    }
    if (editMenu[8].showReplaceBox) {
      if (!(event.target).closest('.replaceBox')) {
        editMenu[8].showReplaceBox = false
        this.setState({mainMenuData})
      }
    }
    // TODO: probably need to remove this and handle return to textarea
    // via GoToBox click handlers
    if (editMenu[9].showGoToBox) {
      if (!(event.target).closest('.goToBox')) {
        editMenu[9].showGoToBox = false
        this.setState({mainMenuData})
      }
    }

    // format submenu dialog boxes    
    if (formatMenu[1].showFontBox) {
      if (!(event.target).closest('.fontBox')) {
        formatMenu[1].showFontBox = false
        this.setState({mainMenuData})
      }
    }

    // help submenu dialog boxes
    if (helpMenu[0].showHelpBox) {
      if (!(event.target).closest('.helpBox')) {
        helpMenu[0].showHelpBox = false
        this.setState({mainMenuData})
      }
    }
    if (helpMenu[1].showAboutBox) {
      if (!(event.target).closest('.aboutBox')) {
        helpMenu[1].showAboutBox = false
        this.setState({mainMenuData})
      }
    } 
  }

  onMainMenuClick (event, menuItem) {
    event.stopPropagation()
    console.warn(menuItem)
    const callback = this[menuItem.onClick]
    callback && callback(menuItem)
  }

  onNotepadMouseDown (event, column, row) {
    event.stopPropagation()    
    // console.log(event.target.innerHTML) // how to get the actual character
    // console.log(event.target)
    const documentSelection = {...this.state.documentSelection}
    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()

    // successfully passing which column is selected and which row is selected
    // on click
    console.log('column + 1')
    console.log(column + 1)
    // NOTE: use column for the cursor but column + 1 for data stuff
    documentCursor.column = column 
    documentCursor.row = row
    documentSelection.selectionStart.column = column 
    documentSelection.selectionStart.row = row
    documentSelection.selectionEnd.column = column 
    documentSelection.selectionEnd.row = row
    documentSelection.isSelected = true
    documentSelection.isSelectedChanging = true
    
    console.log('row')
    console.log(row)

    let updateCursor = true
    let updateDocument = true

    const nextState = {}
    if (updateDocument) {
      nextState.documentContent = documentContent
      nextState.documentSelection = documentSelection
    }

    if (updateCursor) {
      nextState.documentCursor = documentCursor
    }
    this.setState(nextState)

  }

  onNotepadMouseEnter (event, column, row) {
    // console.log('onNotepadMouseEnter')
    // *hint* this seems to miss the first item to be captured by the selection object    
    event.stopPropagation()    
    const documentSelection = {...this.state.documentSelection}
    const documentCursor = {...this.state.documentCursor}
    //const documentContent = this.state.documentContent.slice()
    if (documentSelection.isSelected && documentSelection.isSelectedChanging) {
      console.log ('Enter - isSelected true')
      documentCursor.column = column 
      documentCursor.row = row
      documentSelection.selectionEnd.column = column
      documentSelection.selectionEnd.row = row
      //documentCursor
      // change css class here or some kind of flag
      // also move the cursor here
      this.setState({documentCursor})
      
    }
    

  }

  onNotepadMouseLeave () {
    // console.log('onNotepadMouseLeave')
    // *hint* this seems to non-duplicately capture all items that are supposed to be selected   
    const documentSelection = {...this.state.documentSelection}
    if (documentSelection.isSelected) {
      console.log ('Leave - isSelected true and event.target is: ')
      // console.log(event.target) returns: <react></react> 
      documentSelection.isSelectedChanging = false
      // change css class here or some kind of flag
      this.setState({documentSelection})
      
    }
    // console.log(event.target)
    
  }

  onNotepadMouseUp () {
    const documentSelection = {...this.state.documentSelection}
    // console.log('onNotepadMouseUp')
    //documentSelection.isSelected = false
    if (documentSelection.isSelected) {
      console.log ('Leave - isSelected true and event.target is: ')
      documentSelection.isSelectedChanging = false
      // console.log(event.target) returns: <react></react> 
    }

    let updateDocument = true
    const nextState = {}
    if (updateDocument) {
      nextState.documentSelection = documentSelection
    }

    this.setState(nextState)

  }

  isSelected (column, row) {
    const documentSelection = {...this.state.documentSelection}
    const documentContent = this.state.documentContent.slice()
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd
    const startEndAreSame = (start, end) => start.column === end.column && start.row === end.row
    // var x = ['jack','bob','jill','went','up','a','hill'].reduce( function (index, column) { 
    // console.log(column.length)
    // return index += column.length }, 0)
    if (!documentSelection.isSelected) {
      return false
    }
    function indexOfPosition (content, column, row) {
      let index = 0
      let currentRow = 0

      while (currentRow <= row) {
        const rowData = content[currentRow]

        if (rowData.length) {
          for (let i = 0; i < rowData.length; i += 1) {
            index += 1
          }

          if (currentRow === row) {
            index -= (rowData.length - column)
          }
        }

        currentRow += 1
      }
      return index
    }

    const startIndex = indexOfPosition(documentContent,start.column, start.row)
    //console.log('start index', startIndex)

    const currentIndex = indexOfPosition(documentContent, column, row)
    //console.log('start index', currentIndex)

    const endIndex = indexOfPosition(documentContent,end.column, end.row)
    //console.log('end index', endIndex)

      return documentSelection.isSelected && !startEndAreSame(start,end) && (
        (currentIndex >= startIndex && currentIndex <= endIndex) || (
          (startIndex > endIndex) && (currentIndex <= startIndex && currentIndex >= endIndex)
        )
      )
    }

  toggleFileMenu () {
    this.setState((prevState) => {
      mainMenuData.topLevel.items[4].subLevel.visible = false
      mainMenuData.topLevel.items[3].subLevel.visible = false
      mainMenuData.topLevel.items[2].subLevel.visible = false
      mainMenuData.topLevel.items[1].subLevel.visible = false
      mainMenuData.topLevel.items[0].subLevel.visible = !prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleFileMenu!')
  }

  toggleEditMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[3].subLevel.visible = false
      mainMenuData.topLevel.items[4].subLevel.visible = false
      mainMenuData.topLevel.items[2].subLevel.visible = false
      mainMenuData.topLevel.items[0].subLevel.visible = false
      mainMenuData.topLevel.items[1].subLevel.visible = !prevState.mainMenuData.topLevel.items[1].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleEditMenu!')
  }

  toggleFormatMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[4].subLevel.visible = false 
      mainMenuData.topLevel.items[3].subLevel.visible = false 
      mainMenuData.topLevel.items[1].subLevel.visible = false 
      mainMenuData.topLevel.items[0].subLevel.visible = false 
      mainMenuData.topLevel.items[2].subLevel.visible = !prevState.mainMenuData.topLevel.items[2].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleFormatMenu!')
  }

  toggleViewMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[4].subLevel.visible = false
      mainMenuData.topLevel.items[2].subLevel.visible = false
      mainMenuData.topLevel.items[1].subLevel.visible = false
      mainMenuData.topLevel.items[0].subLevel.visible = false
      mainMenuData.topLevel.items[3].subLevel.visible = !prevState.mainMenuData.topLevel.items[3].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleViewMenu!')
  }

  toggleHelpMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[0].subLevel.visible = false 
      mainMenuData.topLevel.items[1].subLevel.visible = false 
      mainMenuData.topLevel.items[2].subLevel.visible = false 
      mainMenuData.topLevel.items[3].subLevel.visible = false 
      mainMenuData.topLevel.items[4].subLevel.visible = !prevState.mainMenuData.topLevel.items[4].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleHelpMenu!')
  }

  onClickSaveYes () {
    console.log('onClickSaveYes was clicked!')
    const mainMenuData = {...this.state.mainMenuData}
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items
    const showModal = true
    this.setState((prevState) => {
      mainMenuData.topLevel.items[0].showNotSavedWarningBox = false
      if (!this.state.hasSaved) {
        fileMenu[3].showSaveAsBox = true
        fileMenu[3].disableOtherMenuHandlers = true
      } else {
        // TODO: call save functionality not save as here
        console.warn('call save NOT save as functionality here')
        console.warn(`value of hasSaved: ${this.state.hasSaved}`)
        // alert('Calling SAVE (patch request) here!')
        this.fileSaveMenu()
      }
      return {mainMenuData, showModal}
    })
  }
  
  onClickSaveNo () {
    console.log('onClickSaveNo was clicked!')
    const mainMenuData = {...this.state.mainMenuData}
    const saved = true
    let fileOpenControl = new Promise((resolve, reject) => {
      this.setState((prevState) => {
        mainMenuData.topLevel.items[0].subLevel.visible = false
        mainMenuData.topLevel.items[0].showNotSavedWarningBox = false
        return {mainMenuData, saved}
      })
      resolve(mainMenuData.topLevel.warningFromMenuItem)
    })

    fileOpenControl.then((priorMenuItem) => {
        mainMenuData.topLevel.items[0].subLevel.visible = false

        switch (priorMenuItem) {
          case 'fileOpenMenu':
            this.setState((prevState) => {
              mainMenuData.topLevel.items[0].subLevel.visible = false
              const dialogBoxType = 'renderOpenFileDialog'              
              //mainMenuData.topLevel.items[0].subLevel.items[1].showOpenFileBox = true
              return {mainMenuData, saved, dialogBoxType}
            })
            break
          case 'fileNewMenu':
            this.fileNewMenu()
            break
          case 'exitNotepad':
            this.exitNotepad()
            break
          default:
            throw new Error('unknown menu item clicked')
        }
    })
  } 
  
  onClickSaveCancel () {
    console.log('onClickSaveCancel was clicked!')
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[0].showNotSavedWarningBox = false
      return {mainMenuData}
    })
  }

  fileNewMenu (menuItem) {
    // pop up dialog    
    // set document content to empty
    console.log(`fileNewMenu is clicked here`)
    console.log(menuItem)

    const documentContent = this.state.documentContent.slice()
    const documentCursor = {...this.state.documentCursor}
    const mainMenuData = {...this.state.mainMenuData}
    const saved = this.state.saved
    
    if (!documentContent.every(line => line === '') && !saved) {
      console.log('need to save file!')
        this.setState((prevState) => {
          mainMenuData.topLevel.warningFromMenuItem = 'fileNewMenu'
          mainMenuData.topLevel.items[0].subLevel.visible = false
          mainMenuData.topLevel.items[0].showNotSavedWarningBox = true
          return {mainMenuData}
        })
      return
    }
    
    const nextState = {}
    // just to keep 13 lines for a full textarea
    const resetDocumentContent = ['','','','','','','','','','','','','']
    
    documentCursor.row = 0
    documentCursor.column = 0
    nextState.mainMenuData = mainMenuData
    nextState.mainMenuData.topLevel.items[0].subLevel.visible = false
    nextState.documentFileName = 'Untitled.txt'
    nextState.documentContent = resetDocumentContent
    nextState.documentCursor = documentCursor
    nextState.saveAsFormFileName = ''
    nextState.saveAsFormFileDescription = ''
    nextState.undoStack = []
    nextState.redoStack = []

    this.setState(nextState)
    return
  }

  fileOpenMenu (menuItem = null) {
    // display all of your gists
    // invoke local file system
    // hint: fileInput element type === 'file'
    const documentContent = this.state.documentContent.slice()
    const mainMenuData = {...this.state.mainMenuData}
    const saved = this.state.saved
    const showModal = true

    console.log(`fileOpenMenu is clicked here`)
    if (documentContent.every(line => line === '') || saved) {
      this.openModal()

      console.log('need to save file!')
        this.setState((prevState) => {
          const dialogBoxType = 'renderOpenFileDialog'
          // mainMenuData.topLevel.items[0].subLevel.items[1].showOpenFileBox = true
          //mainMenuData.topLevel.items[0].subLevel.items[1].disableOtherMenuHandlers = true
          mainMenuData.topLevel.items[0].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
          return {mainMenuData, showModal, dialogBoxType}
        })
    } else if (!saved) {
        this.setState((prevState) => {
          mainMenuData.topLevel.warningFromMenuItem = 'fileOpenMenu'          
          mainMenuData.topLevel.items[0].subLevel.visible = false
          mainMenuData.topLevel.items[0].showNotSavedWarningBox = true//!prevState.mainMenuData.topLevel.items[0].subLevel.visible
          return {mainMenuData, showModal}
        })
      
    }
    
  }

  onGistClick (event, gist) {
    const documentCursor = {...this.state.documentCursor}
    const mainMenuData = {...this.state.mainMenuData}
    const options = {
      method: 'GET'
    }

    fetch(gist.url, options)
    .then(response => {
      if (response.ok) {
        return response.text()
      }
    }).then ( text => {
      const gistTextData = text.split('\n')
      const newDocumentContent = []
      gistTextData.forEach(line => newDocumentContent.push(line))
      // 13 lines is how a full textarea is, roughly
      while (newDocumentContent.length < 13) { newDocumentContent.push('') }
      return newDocumentContent
    })
    .then ( newDocumentContent => {

      const nextState = {}

      documentCursor.row = 0
      documentCursor.column = 0

      mainMenuData.topLevel.items[0].subLevel.items[1].showOpenFileBox = false
      mainMenuData.topLevel.items[0].subLevel.items[1].disableOtherMenuHandlers = false   
      
      nextState.documentCursor = documentCursor
      nextState.documentFileName = gist.name
      nextState.documentContent = newDocumentContent
      nextState.openFileGistID = gist.id
      nextState.openFileGistType = gist.public
      nextState.mainMenuData = mainMenuData
      nextState.saved = true // MIGHT need to change...
      nextState.hasSaved = true
      nextState.showModal = false
      this.setState(nextState)
    }).then (this.closeModal())
    .catch ( error => {
      console.error(`gist fetch error: ${error}`)
    })
  }

  openFileHandleChange (event) {
    this.setState({openFileName: event.target.value})
  }

  openFileHandleSubmit (event) {
    console.log(`openFile input value is: ${this.state.openFileName}`)
    event.preventDefault()
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items
    const showModal = false
    this.setState((prevState) => {
      fileMenu[1].showOpenFileBox = false
      fileMenu[1].disableOtherMenuHandlers = false
      mainMenuData.topLevel.items[0].subLevel.visible = false
      return {mainMenuData, showModal}
    })
  }

  openFileHandleCancel (event) {
    event.preventDefault()
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items    
    const showModal = false
    this.setState((prevState) => {
      fileMenu[1].showOpenFileBox = false
      fileMenu[1].disableOtherMenuHandlers = false
      mainMenuData.topLevel.items[0].subLevel.visible = false
      return {mainMenuData, showModal}
    })
  }

  fileSaveMenu (menuItem) {
    // save to your gists
    const mainMenuData = {...this.state.mainMenuData}
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items
    const hasSaved = this.state.hasSaved
    const saved = true
    const showModal = true 
    console.log(`fileSaveMenu is clicked here`)
    if (hasSaved) {
      const documentFileName = this.state.documentFileName
      const documentContent = this.state.documentContent.slice()
      const currentFileDescription = this.state.saveAsFormFileDescription;
      const gistID = this.state.openFileGistID || this.state.newSavedGistID
      const gistType = this.state.gistType

      console.log('gistType: ' + gistType)
      const url = `https://api.github.com/gists/${gistID}`

      const patchContent = {
        description: currentFileDescription,
        public: (gistType !== 'secret'),
        files: {
          [documentFileName] : {
            content: documentContent.join('\n')
          }
        }
      }

      console.log(JSON.stringify(patchContent))

      const patchOptions = {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${myInfo.TestToken}`
        },
        body: JSON.stringify(patchContent)
      }

      saveGist(url, patchOptions)

      this.setState((prevState) => {
        mainMenuData.topLevel.items[0].subLevel.visible =  false
        return {mainMenuData, saved}
      })
    } else {
      this.setState((prevState) => {
        fileMenu[3].showSaveAsBox = true
        fileMenu[3].disableOtherMenuHandlers = true
        mainMenuData.topLevel.items[0].subLevel.visible = false
        return {mainMenuData, showModal}
      })
    }
  }
  fileSaveAsMenu (menuItem) {
    // ask you for different name and where to save it
    const mainMenuData = {...this.state.mainMenuData}
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items
    const showModal = true
    console.log(`fileSaveAsMenu is clicked here`)
    this.setState((prevState) => {
      fileMenu[3].showSaveAsBox = true
      fileMenu[3].disableOtherMenuHandlers = true
      mainMenuData.topLevel.items[0].subLevel.visible = false
      return {mainMenuData, showModal}
    })
  }

  saveAsHandleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }
  saveAsHandleSubmit (event) {
    event.preventDefault()  
    const gistType = this.state.gistType  
    const documentFileName = this.state.saveAsFormFileName   
    const newFileDescription = this.state.saveAsFormFileDescription;
    const documentContent = this.state.documentContent.slice()
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items
    const hasSaved = true
    const saved = true
    const showModal = false
    const url = `https://api.github.com/gists`   

    const getOptions = {
      method: 'GET',
      headers: {
        'Authorization': `token ${myInfo.TestToken}`
      }
    }

    const postContent = {
      // TODO: user define-able for 'description'
      // and make this 'public' choice for the user, secret or public gist
      description: newFileDescription,
      public: (gistType !== 'secret'),
      files: {
        [documentFileName] : {
          content: (!documentContent.every(line => line === '') 
            && documentContent.join('\n')) 
            || 'empty gist'
        }
      }
    }

    const postOptions = {
      method: 'POST',
      headers: {
        'Authorization': `token ${myInfo.TestToken}`
      },
      body: JSON.stringify(postContent)
    }

    const userGistsUrl = `https://api.github.com/users/${myInfo.username}/gists?per_page=100`

    this.setState((prevState) => {
      fileMenu[3].showSaveAsBox = false     
      fileMenu[3].disableOtherMenuHandlers = false  
      return {documentFileName, hasSaved,saved, showModal}     
    })

    // TODO: handle OAuth, this works right now because this is my personal access token
    const updateGists = () => {
      return getGists(userGistsUrl, getOptions, (filesArray) => {
        this.setState((prevState) => {
          const newSavedGistID = filesArray[0][0].id
          mainMenuData.topLevel.items[0].subLevel.items[1].gists.files = filesArray
          mainMenuData.topLevel.items[0].subLevel.visible = false
          return {mainMenuData, showModal, saved, hasSaved, newSavedGistID}
        })
      })
    }

    return saveAsGist(url, postOptions).then(updateGists)
    
  }

  saveAsHandleCancel (event) {
    event.preventDefault()
    const fileMenu = mainMenuData.topLevel.items[0].subLevel.items    
    const showModal = false
    this.setState((prevState) => {
      fileMenu[3].showSaveAsBox = false
      fileMenu[3].disableOtherMenuHandlers = false
      mainMenuData.topLevel.items[0].subLevel.visible = false
      return {mainMenuData, showModal}
    })
  }

  printMenu (menuItem) {
    console.log(`printMenu is clicked here`)
    console.log(menuItem)
    const mainMenuData = {...this.state.mainMenuData}
    window.print()
    this.setState((prevState) => {
      mainMenuData.topLevel.items[0].subLevel.visible = false
      return {mainMenuData}
    })
  }
  exitNotepad (menuItem) {
    // close the tab -> DO NOT close window
    // or navigate to user's homepage
    console.log(`exitNotepad is clicked here`)
    const documentContent = this.state.documentContent.slice()
    const mainMenuData = {...this.state.mainMenuData}
    const saved = this.state.saved

    if (!documentContent.every(line => line === '') && !saved) {
        this.setState((prevState) => {
          mainMenuData.topLevel.warningFromMenuItem = 'exitNotepad'
          mainMenuData.topLevel.items[0].subLevel.visible = false
          mainMenuData.topLevel.items[0].showNotSavedWarningBox = true
          return {mainMenuData}
        })

      return
    }

    if (!!window.chrome) {
      window.open('https://www.google.com/_/chrome/newtab', '_self')
    } else if (typeof InstallTrigger !== undefined) {
      window.open('about:home', '_self')
    } else {
      window.open('https://google.com', '_self')
    }
  }

  editUndo (menuItem){
    // undo last action
    console.log('editUndo clicked here')
    const documentCursor = {...this.state.documentCursor}
    // console.log(menuItem)
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice() 
    const redoStack = this.state.redoStack.slice()   
    const topLayer = undoStack.slice(undoStack.length - 1)

    function stackOps (stackLayer) {
      /**
      * @param {Array} stackLayer - stack of layer to perform ops on
      */

      if (undoStack.length) {
        console.log("Undo - stackOps:")        
        if(stackLayer[0].event === 'insertCharacter') {
          console.log(`stack value: ${JSON.stringify(stackLayer[0])}`)
          console.log('Undo test: insertCharacter')
          const deleteBackCharArray = documentContent[stackLayer[0].position.row]
            .split('')
            .slice()

          const removeChar = deleteBackCharArray
            .splice(stackLayer[0].position.column - 1, 1)
          console.log('deleteBackCharArray: ')
          console.log(deleteBackCharArray)
          console.log('removeChar: ')
          console.log(removeChar)

          documentCursor.column -= 1
          documentContent[stackLayer[0].position.row] = deleteBackCharArray.join('')

          undoStack.length !== 0 && redoStack.push(undoStack.pop())          

        } else if (stackLayer[0].event === 'insertBackspace') {

          console.log(`UNDO - inside insertBackspace if block: 
            ${JSON.stringify(stackLayer[0])}`)

          const addBackChar = documentContent[stackLayer[0].position.row].split('')
          addBackChar.splice(stackLayer[0].position.column, 0, stackLayer[0].value)
          console.log('after splice: ')
          console.log(addBackChar)

          documentCursor.column += 1
          documentContent[stackLayer[0].position.row] = addBackChar.join('')

          console.log ('new docContent:')
          console.log(documentContent)
          undoStack.length !== 0 && redoStack.push(undoStack.pop())
    
        } else if (stackLayer[0].event === 'insertDelete') {
          console.log(`undoStack layer Event is: ${stackLayer[0].event}`)

          const addBackChar = documentContent[stackLayer[0].position.row].split('')
          
          addBackChar.splice(stackLayer[0].position.column, 0, stackLayer[0].value)
          console.log('after splice: ')
          console.log(addBackChar)
          documentContent[stackLayer[0].position.row] = addBackChar.join('')


          undoStack.length !== 0 && redoStack.push(undoStack.pop())

        } else if (stackLayer[0].event === 'editCut') {

          console.log(`undoStack layer Event is: ${stackLayer[0].event}`)
          undoStack.length !== 0 && redoStack.push(undoStack.pop())
          
        } else if (stackLayer[0].event === 'editPaste') {

          console.log(`undoStack layer Event is: ${stackLayer[0].event}`)
          undoStack.length !== 0 && redoStack.push(undoStack.pop())
          
        }
      } 
    }

    stackOps(topLayer)
    
    let updateCursor = true
    let updateDocument = true

    const nextState = {}
    if (updateDocument) {
      nextState.documentContent = documentContent
      nextState.undoStack = undoStack
      nextState.redoStack = redoStack
    }

    if (updateCursor) {
      nextState.documentCursor = documentCursor
    }

    this.setState(nextState)

  }

  editRedo (menuItem) {

    console.log('editRedo called here')    
    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice() 
    const redoStack = this.state.redoStack.slice()   
    const topLayer = redoStack.slice(redoStack.length - 1)
    function stackOps (stackLayer) {
      /**
      * @param {Array} stackLayer - stack of layer to perform ops on
      */

      if (redoStack.length) {
        console.log("Redo - stackOps:")        
        if(stackLayer[0].event === 'insertCharacter') {
          console.log(`stack value: ${JSON.stringify(stackLayer[0])}`)

          const addBackChar = documentContent[stackLayer[0].position.row].split('')
          
          addBackChar.splice(stackLayer[0].position.column - 1, 0, stackLayer[0].value)
          console.log('after splice: ')
          console.log(addBackChar)

          documentCursor.column += 1
          documentContent[stackLayer[0].position.row] = addBackChar.join('')


          console.log ('new docContent:')
          console.log(documentContent)


          redoStack.length !== 0 && undoStack.push(redoStack.pop())
          

        } else if (stackLayer[0].event === 'insertBackspace') {

          console.log(`REDO - inside insertBackspace if block: 
            ${JSON.stringify(stackLayer[0])}`)
          console.log(redoStack[redoStack.length - 2])
          console.log(JSON.stringify(documentContent))
          console.log(JSON.stringify(documentCursor))

          const deleteBackCharArray = documentContent[stackLayer[0].position.row]
            .split('')
            .slice()

          const removeChar = deleteBackCharArray.splice(stackLayer[0].position.column, 1)
          console.log('deleteBackCharArray: ')
          console.log(deleteBackCharArray)
          console.log('removeChar: ')
          console.log(removeChar)
          
          documentContent[stackLayer[0].position.row] = deleteBackCharArray.join('')

          redoStack.length !== 0 && undoStack.push(redoStack.pop())
          

        } else if (stackLayer[0].event === 'insertDelete') {
          // TODO: ditto (but maybe slightly opposite?) to 'undo' insertDelete
          console.log(`redoStack layer Event is: ${stackLayer[0].event}`)
          const deleteBackCharArray = documentContent[stackLayer[0].position.row]
            .split('')
            .slice()

          const removeChar = deleteBackCharArray.splice(stackLayer[0].position.column, 1)
          console.log('deleteBackCharArray: ')
          console.log(deleteBackCharArray)
          console.log('removeChar: ')
          console.log(removeChar)

          documentContent[stackLayer[0].position.row] = deleteBackCharArray.join('')
                    
          redoStack.length !== 0 && undoStack.push(redoStack.pop())
          
          
        } else if (stackLayer[0].event === 'editCut') {

          console.log(`redoStack layer Event is: ${stackLayer[0].event}`)
          redoStack.length !== 0 && undoStack.push(redoStack.pop())          
          
        } else if (stackLayer[0].event === 'editPaste') {
          
          console.log(`redoStack layer Event is: ${stackLayer[0].event}`)
          redoStack.length !== 0 && undoStack.push(redoStack.pop())
          
        }
      }
    }
    stackOps(topLayer)
    
    let updateCursor = true
    let updateDocument = true

    const nextState = {}
    if (updateDocument) {
      nextState.documentContent = documentContent
      nextState.undoStack = undoStack
      nextState.redoStack = redoStack
    }

    if (updateCursor) {
      nextState.documentCursor = documentCursor
    }

    this.setState(nextState)

  }

  editCut  (menuItem){
    // virtual clipboard cut (this application specific)
    // BONUS: native operating system clipboard
    // TODO: editCut needs to be added to the undo and redo stacks
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
    // TODO: editPaste needs to be added to the undo and redo stacks    
    console.log('editPaste clicked here')   
    console.log(menuItem)         
  }

  editDelete  (menuItem) {
    // delete selection
    // TODO: editDelete needs to be added to the undo and redo stacks    
    console.log('editDelete clicked here')   
    console.log(menuItem)         
  }

  editFind (menuItem) {
    // open up Find dialog, then finds character sequence 
    console.log('editFind clicked here')  
    console.log(menuItem) 
    const mainMenuData = {...this.state.mainMenuData}
    const editMenu = mainMenuData.topLevel.items[1].subLevel.items
    this.setState((prevState) => {
      editMenu[6].showFindBox = true
      editMenu[6].disableOtherMenuHandlers = true
      mainMenuData.topLevel.items[1].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })         
  }

  editFindNext (menuItem) {
    // finds next occurrence of current selection
    console.log('editFindNext clicked here')  
    console.log(menuItem)          
  }

  editReplace (menuItem) {
    // open up find and replace dialog
    // TODO: eitReplace needs to be added to the undo and redo stacks    
    console.log('editReplace clicked here')  
    console.log(menuItem)
    const mainMenuData = {...this.state.mainMenuData}
    const editMenu = mainMenuData.topLevel.items[1].subLevel.items
    this.setState((prevState) => {
      editMenu[8].showReplaceBox = true
      editMenu[8].disableOtherMenuHandlers = true
      mainMenuData.topLevel.items[1].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })          
  }

  editGoTo (menuItem) {
    // goes to specific line number if word wrap NOT selected
    console.log('editGoTo clicked here')     
    console.log(menuItem)  
    const mainMenuData = {...this.state.mainMenuData}
    const editMenu = mainMenuData.topLevel.items[1].subLevel.items
    this.setState((prevState) => {
      editMenu[9].showGoToBox = true
      editMenu[9].disableOtherMenuHandlers = true
      mainMenuData.topLevel.items[1].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })        
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
    const mainMenuData = {...this.state.mainMenuData}
    const formatMenu = mainMenuData.topLevel.items[2].subLevel.items
    this.setState((prevState) => {
      formatMenu[1].showFontBox = true
      formatMenu[1].disableOtherMenuHandlers = true
      mainMenuData.topLevel.items[2].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })          
  }

  viewStatusBar (menuItem) {
    // if word Wrap NOT checked, then creates a bottom display of 
    // where the cursor is, e.g., "Ln 11, Col 17"
    // displays checked box also
    console.log('viewStatusBar clicked here')  
    console.log(menuItem)          
  }

  viewHelpBox (menuItem) {
    // opens up new searchable help tab 
    console.log('viewHelpBox clicked here')   
    console.log(menuItem)   
    const mainMenuData = {...this.state.mainMenuData}
    const helpMenu = mainMenuData.topLevel.items[4].subLevel.items
    this.setState((prevState) => {
      helpMenu[0].showHelpBox = true
      helpMenu[0].disableOtherMenuHandlers = true
      mainMenuData.topLevel.items[4].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })     
  }

  helpAboutNotepad (menuItem) {
    // basic about this application stuff
    console.log('helpAboutNotepad clicked here')
    console.log(menuItem)    
    const mainMenuData = {...this.state.mainMenuData}
    const helpMenu = mainMenuData.topLevel.items[4].subLevel.items
    this.setState((prevState) => {
      helpMenu[1].showAboutBox = true
      helpMenu[1].disableOtherMenuHandlers = true
      mainMenuData.topLevel.items[4].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })
  }

  componentDidMount () {
    this.topLevel.focus()
    const options = {
      method: 'GET', // gonna be POST
      headers: {
        'Authorization': `token ${myInfo.TestToken}`
      }
    }

    const url = `https://api.github.com/users/${myInfo.username}/gists?per_page=100`

    getGists(url, options, (filesArray) => {
      this.setState((prevState) => {
        mainMenuData.topLevel.items[0].subLevel.items[1].gists.files = filesArray
        return {mainMenuData}
      })
    })
  }

  moveToStartOfLine (documentCursor, documentContent) {
    documentCursor.column = 0
  }

  moveToEndOfLine (documentCursor, documentContent) {
    if (documentContent[documentCursor.row].length) {
      documentCursor.column = documentContent[documentCursor.row].length
    } else {
      documentCursor.column = 0
    }
  }

  moveToTopOfDocument (documentCursor, documentContent) {
    documentCursor.row = 0
    documentCursor.column = 0
  }

  moveToBottomOfDocument (documentCursor, documentContent) {
    documentCursor.row = documentContent.length - 1
    documentCursor.column = 0
  }

  moveUp (documentCursor, documentContent) {
    documentCursor.row -= 1
    if (documentCursor.row < 0) {
      documentCursor.row = 0
    }
    if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
      this.moveToEndOfLine(documentCursor, documentContent)
    }
  }

  moveDown (documentCursor, documentContent) {
    documentCursor.row += 1
    if (documentCursor.row > documentContent.length - 1) {
      documentCursor.row = documentContent.length - 1
    }
    if (documentCursor.column > documentContent[documentCursor.row].length -1) {
      this.moveToEndOfLine(documentCursor, documentContent)
    }
  }  
  
  moveLeft (documentCursor, documentContent) {
    documentCursor.column -= 1
    if (documentCursor.column < 0) {
      if (documentCursor.row > 0) {
        this.moveUp(documentCursor, documentContent)
        this.moveToEndOfLine(documentCursor, documentContent)
      } else {
        this.moveToStartOfLine(documentCursor, documentContent)
      }
    }
  }  
  
  moveRight (documentCursor, documentContent) {
    documentCursor.column += 1
    if (documentCursor.column > documentContent[documentCursor.row].length) {
      if (documentCursor.row < documentContent.length -1) {
        this.moveDown(documentCursor, documentContent)
        this.moveToStartOfLine(documentCursor, documentContent)
      } else {
        this.moveToEndOfLine(documentCursor, documentContent)
      }
    }
  }

  insertCarriageReturn (documentCursor, documentContent) {
    const EMPTY_LINE = ''
    const rowContent = documentContent[documentCursor.row]
    const pre = rowContent.slice(0, documentCursor.column)
    const post = rowContent.slice(documentCursor.column)

    if (documentCursor.row === 0) {
      // top row
      documentContent.splice(0, 0, EMPTY_LINE)
      documentCursor.row += 1
    } else if (documentCursor.row < documentContent.length -1) {
      // middle rows
      documentContent.splice(documentCursor.row, 0, EMPTY_LINE)
      documentCursor.row += 1
    } else {
      // bottom row
      documentContent.push(EMPTY_LINE)
      documentCursor.row += 1
    }

    if (documentCursor.column > 0 && rowContent.length > 0) {
      documentContent[documentCursor.row -1] = pre
      documentContent[documentCursor.row] = post
    }

    documentCursor.column = 0

  }

  insertBackspace (documentCursor, documentContent) {   
    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    const rowContent = documentContent[documentCursor.row]

    if (documentCursor.column > 0) {
      documentCursor.column -= 1
      const pre = rowContent.slice(0, documentCursor.column)
      const post = rowContent.slice(documentCursor.column + 1)
      changeRow(`${pre}${post}`)
    } else {
      if (documentCursor.row === 0 && documentCursor.column === 0) {
        // this.beep()
      } else if (documentContent.length > 1 && rowContent.length === 0) {
        documentContent.splice(documentCursor.row, 1)
        documentCursor.row -= 1
        if (documentCursor.row < 0) {
          documentCursor.row = 0
        }
        this.moveToEndOfLine(documentCursor, documentContent)
      } else if (documentCursor.row > 0 && rowContent.length > 0) {
        documentCursor.row -= 1
        this.moveToEndOfLine(documentCursor, documentContent)

        const rowAboveContent = documentContent[documentCursor.row]
        changeRow(`${rowAboveContent}${rowContent}`)
        documentContent.splice(documentCursor.row + 1, 1)
      }
    }
  }

  insertDelete (documentCursor, documentContent) {
    const rowContent = documentContent[documentCursor.row]

    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    const pre = rowContent.slice(0, documentCursor.column)
    console.log('pre')
    console.log(pre)
    const post = rowContent.slice(documentCursor.column + 1)
    console.log('post')
    console.log(post)
    // console.log('${pre}${post}')
    console.log(`${pre}${post}`)

    // TODO: this if statement seems to be preventing correct delete events,
    // check to see if null values for 'post' don't mess anything up!
    changeRow(`${pre}${post}`)

    console.log(`insertDelete called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
  }

  insertCharacter (character, documentCursor, documentContent) {
    const rowContent = documentContent[documentCursor.row]
    
    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    if (documentCursor.column === 0) {
      changeRow(`${character}${rowContent}`)
    } else if (documentCursor.column === rowContent.length - 1 ) {
      changeRow(`${rowContent}${character}`)
    } else {
      const pre = rowContent.slice(0, documentCursor.column)
      const post = rowContent.slice(documentCursor.column)
      changeRow(`${pre}${character}${post}`)
    }
  }
  onKeyDown (event) {
    if (this.state.showModal) {
      return
    }

    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice()

    let updateCursor = false
    let updateDocument = false
    const moveToStartOfLine = () => this.moveToStartOfLine(documentCursor, documentContent)
    const moveToEndOfLine = () => this.moveToEndOfLine(documentCursor, documentContent)
    const moveToTopOfDocument = () => this.moveToTopOfDocument(documentCursor, documentContent)
    const moveToBottomOfDocument = () => this.moveToBottomOfDocument(documentCursor, documentContent)
    const moveUp = () => this.moveUp(documentCursor, documentContent)
    const moveDown = () => this.moveDown(documentCursor, documentContent)
    const moveLeft = () => this.moveLeft(documentCursor, documentContent)
    const moveRight = () => this.moveRight(documentCursor, documentContent)

    const {
      // altKey,
      // ctrlKey,
      // key,
      // locale,
      // location,
      metaKey,
      // repeat,
      // which,
      //charCode,
      keyCode,
      //shiftkey
    } = event

    const isKey = (keyMatch) => keyCode === keyMatch

    if (CURSOR_KEYS.indexOf(keyCode) !== -1) {
      updateCursor = true
    }

    const nextStackItem = {}

    if (isKey(KEY.BACKSPACE)) {
      event.preventDefault()
      nextStackItem.value = documentContent[documentCursor.row][documentCursor.column - 1]      
      this.insertBackspace(documentCursor, documentContent)
      nextStackItem.position = documentCursor            
      nextStackItem.event = 'insertBackspace' 
      if (nextStackItem.value) {
        undoStack.push(nextStackItem)
      }          
      updateCursor = true
      updateDocument = true
    } else if (isKey(KEY.DELETE)) {
      event.preventDefault()
      nextStackItem.value = documentContent[documentCursor.row][documentCursor.column]      
      this.insertDelete(documentCursor, documentContent)
      updateCursor = true
      updateDocument = true
      nextStackItem.position = documentCursor    
      nextStackItem.event = 'insertDelete'                   
      if (nextStackItem.value) {
        undoStack.push(nextStackItem)
      }
    } else if (isKey(KEY.END)) {
      event.preventDefault()
      moveToEndOfLine()
      updateCursor = true
    } else if (isKey(KEY.HOME)) {
      event.preventDefault()
      moveToStartOfLine()
      updateCursor = true
    } else if (isKey(KEY.LEFT)) {
      if (metaKey) {
        moveToStartOfLine()
      } else {
        moveLeft()
      }
    } else if (isKey(KEY.RIGHT)) {
      if (metaKey) {
        moveToEndOfLine()
      } else {
        moveRight()
      }
    } else if (isKey(KEY.DOWN)) {
      if (metaKey) {
        moveToBottomOfDocument()
      } else {
        moveDown()
      }
    } else if (isKey(KEY.UP)) {
      if (metaKey) {
        moveToTopOfDocument()
      } else {
        moveUp()
      }
    }

    const nextState = {}

    if (updateDocument) {
      nextState.documentContent = documentContent
      nextState.undoStack = undoStack
      nextState.saved = false      
    }

    if (updateCursor) {
      nextState.documentCursor = documentCursor
    }

    this.setState(nextState)
  }

  onKeyPress (event) {
    if (this.state.showModal) {
      return
    }
    const {
      // altKey,
      // ctrlKey,
      // key,
      // locale,
      // location,
      // metaKey,
      // repeat,
      // which,
      charCode,
      keyCode,
      shiftKey
    } = event

    let updateDocument = false

    const documentContent = this.state.documentContent.slice()
    const documentCursor = {...this.state.documentCursor}
    const undoStack = this.state.undoStack.slice()
    const saved = false

    if (charCode === KEY.ENTER) {
      console.warn('KEY: ENTER is pressed here')
      updateDocument = true
      this.insertCarriageReturn(documentCursor, documentContent)
    } else if (charCode && !keyCode) {
      updateDocument = true
      const character = String.fromCharCode(charCode)
      this.insertCharacter(shiftKey
        ? character.toUpperCase()
        : character,
        documentCursor, documentContent)
      const nextStackItem = {}
      nextStackItem.value = character
      nextStackItem.position = documentCursor 
      nextStackItem.event = 'insertCharacter'  
      undoStack.push(nextStackItem)         
      documentCursor.column += 1            
    }

    if (updateDocument) {
      this.setState({documentContent,documentCursor, undoStack, saved})
    }
  }

  render () {
    return (
      <div 
        className="top-level-window"
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        onKeyPress={this.onKeyPress}
        onClick={this.onClickCloseMenuItem}
        ref={(element) => {this.topLevel = element}}
        >
        <div className='app__header'>{`React Notepad - ${this.state.documentFileName}`}</div>
        <div className='app__main-container'>
          <div className='app__menu-bar-container'>
            <MainMenu 
              menu={this.state.mainMenuData} 
              onMainMenuClick={this.onMainMenuClick}
              onMouseUp={this.onNotepadMouseUp}  

              // openFileBox={this.state.mainMenuData.topLevel.items[0].subLevel.items[1]}
              // onGistClick={this.onGistClick}  
              // openFileHandleChange={this.openFileHandleChange}
              // openFileHandleSubmit={this.openFileHandleSubmit}
              // openFileHandleCancel={this.openFileHandleCancel}
              // openFileName={this.openFileName}   
              // TODO: refactor "this.state.mainMenuData.topLevel.items[#].sublevel.items[#]"       
              // into something more readable
              showNotSavedWarningBox={this.state.mainMenuData.topLevel.items[0].showNotSavedWarningBox}
              onClickSaveYes={this.onClickSaveYes}
              onClickSaveNo={this.onClickSaveNo}
              onClickSaveCancel={this.onClickSaveCancel}
              
              saveAsBox={this.state.mainMenuData.topLevel.items[0].subLevel.items[3]}
              gistType={this.state.gistType}
              saveAsHandleChange={this.saveAsHandleChange}
              saveAsFormFileName={this.state.saveAsFormFileName}
              saveAsFormFileDescription={this.state.saveAsFormFileDescription}
              saveAsHandleSubmit={this.saveAsHandleSubmit}
              saveAsHandleCancel={this.saveAsHandleCancel}
              
              findBox={this.state.mainMenuData.topLevel.items[1].subLevel.items[6]}
              replaceBox={this.state.mainMenuData.topLevel.items[1].subLevel.items[8]}
              goToBox={this.state.mainMenuData.topLevel.items[1].subLevel.items[9]}
              fontBox={this.state.mainMenuData.topLevel.items[2].subLevel.items[1]}
              helpBox={this.state.mainMenuData.topLevel.items[4].subLevel.items[0]}
              aboutBox={this.state.mainMenuData.topLevel.items[4].subLevel.items[1]}
            />
          </div>
          <div className="app__document-container">
            <NotePad
              cursor={this.state.documentCursor}
              content={this.state.documentContent}
              selection={this.state.documentSelection}
              isSelected={this.isSelected}
              onMouseDown={this.onNotepadMouseDown}
              onMouseEnter={this.onNotepadMouseEnter}
              onMouseLeave={this.onNotepadMouseLeave}
              onMouseUp={this.onNotepadMouseUp}
              showModal={this.state.showModal}
            />
          </div>
          <div className="app__status-container">
            <StatusBar />
          </div>
          <div className="dev__stack-view-container">
              <UndoStackView
                undoStackObject={this.state.undoStack}
              />
              <RedoStackView
                redoStackObject={this.state.redoStack}
              />
            </div>
        </div>
        {this.state.showModal && this.renderModal()}
      </div>
    )
  }
}

export default App;
