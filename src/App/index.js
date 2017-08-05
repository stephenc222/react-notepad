import React, { Component } from 'react'
import 'whatwg-fetch'
import firebaseApp from './FirebaseConfig'
import firebase from 'firebase'
import {
  Api, 
  typeAhead, 
  getIndexOfPosition,
  scramble,
  selectFindText
} from './helpers'
import MainMenu from './MainMenu'
import fileMenu from './ui-data/fileMenu'
import editMenu from './ui-data/editMenu'
import formatMenu from './ui-data/formatMenu'
import viewMenu from './ui-data/viewMenu'
import helpMenu from './ui-data/helpMenu'
import OpenFileBox from './OpenFileBox'
import NotSavedWarningBox from './NotSavedWarningBox'
import SaveAsBox from './SaveAsBox'
import FindBox from './FindBox'
import ReplaceBox from './ReplaceBox'
import GoToBox from './GoToBox'
import FontBox from './FontBox'
// import HelpBox from './HelpBox'
import AboutBox from './AboutBox'

import NotePad from './Notepad'
import StatusBar from './StatusBar'

// components for development purposes
import RedoStackView from './RedoStackView'
import UndoStackView from './UndoStackView'

import './index.css'

const startData = [
  '',//this is a', 
  '',//tesT OF THE CUT - and there are now way much more than 50 characters here', 
  '',//OPERATION ON A string of', 
  '',//text across multiple -- and there are now way more than 50 characters here', 
  '',//lines in an', 'array',
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

const CURSOR_HOME = { row: 0, column: 0 }

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
window.getIndexOfPosition = getIndexOfPosition
class App extends Component {
  constructor (props) {
    super(props)

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

    this.renderNotSavedWarningBox = this.renderNotSavedWarningBox.bind(this)

    this.renderSaveAsBox = this.renderSaveAsBox.bind(this)

    this.renderFindBox = this.renderFindBox.bind(this)
    
    this.renderReplaceBox = this.renderReplaceBox.bind(this)
    this.replaceHandleChange = this.replaceHandleChange.bind(this)
    this.replaceHandleSubmit = this.replaceHandleSubmit.bind(this)
    this.replaceAll = this.replaceAll.bind(this)

    this.renderGoToBox = this.renderGoToBox.bind(this)
    this.renderFontBox = this.renderFontBox.bind(this)
    this.renderAboutBox = this.renderAboutBox.bind(this)

    this.onClickSaveYes = this.onClickSaveYes.bind(this)
    this.onClickSaveNo = this.onClickSaveNo.bind(this)
    this.onClickSaveCancel = this.onClickSaveCancel.bind(this)

    this.fileNewMenu = this.fileNewMenu.bind(this)

    this.fileOpenMenu = this.fileOpenMenu.bind(this)
    this.onGistClick = this.onGistClick.bind(this)

    this.openFileHandleChange = this.openFileHandleChange.bind(this)
    this.findInFileHandleChange = this.findInFileHandleChange.bind(this)
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this)

    this.openFileHandleSubmit = this.openFileHandleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.fileSaveMenu = this.fileSaveMenu.bind(this)

    this.fileSaveAsMenu = this.fileSaveAsMenu.bind(this)
    this.saveAsHandleChange = this.saveAsHandleChange.bind(this)
    this.saveAsHandleSubmit = this.saveAsHandleSubmit.bind(this)

    this.printMenu = this.printMenu.bind(this)
    this.exitNotepad = this.exitNotepad.bind(this)

    this.toggleEditMenu = this.toggleEditMenu.bind(this)
    this.editCut = this.editCut.bind(this)
    this.editCopy = this.editCopy.bind(this)
    this.editPaste = this.editPaste.bind(this)
    this.editUndo = this.editUndo.bind(this)
    this.editRedo = this.editRedo.bind(this)
    this.editDelete = this.editDelete.bind(this)

    this.editFind = this.editFind.bind(this)
    this.findInFileHandleSubmit = this.findInFileHandleSubmit.bind(this)

    this.editFindNext = this.editFindNext.bind(this)

    this.editReplace = this.editReplace.bind(this)
    this.editGoTo = this.editGoTo.bind(this)
    this.editSelectAll = this.editSelectAll.bind(this)
    this.editTimeDate = this.editTimeDate.bind(this)
    this.goToLineHandleChange = this.goToLineHandleChange.bind(this)
    this.goToLineOnSubmit = this.goToLineOnSubmit.bind(this)

    this.toggleFormatMenu = this.toggleFormatMenu.bind(this)
    // this.formatWordWrap = this.formatWordWrap.bind(this)

    this.formatFont = this.formatFont.bind(this)
    this.handleFontStyleChange = this.handleFontStyleChange.bind(this)
    this.handleFontTypeChange = this.handleFontTypeChange.bind(this)
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this)
    this.fontBoxOnSubmit = this.fontBoxOnSubmit.bind(this)

    this.toggleViewMenu = this.toggleViewMenu.bind(this)

    this.toggleHelpMenu = this.toggleHelpMenu.bind(this)
    this.viewStatusBar = this.viewStatusBar.bind(this)
    this.viewHelp = this.viewHelp.bind(this)
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
    this.switchDevMode = this.switchDevMode.bind(this)

    this.state = {
      fileMenu,
      editMenu,
      formatMenu,
      viewMenu,
      helpMenu,
      uid: null,
      username: '',
      token: '',
      documentFileName: 'Untitled.txt',
      documentCursor: CURSOR_HOME,
      documentContent: startData,
      documentSelection: {
        result: {},
        isSelected: false,
        isSelectedChanging: false,
        selectionStart: {
          row: 0,
          column: 0
        },
        selectionEnd: {
          row: 0,
          column: 0
        }
      },
      statusBarIsHidden: false,
      undoStack: [],
      redoStack: [],
      warningFromMenuItem: '',
      saved: false,
      hasSaved: false,
      showModal: false,
      docIsWrapped: false,
      previousDocLengths: [],
      statusBarVisible: true,
      dialogBoxType: '',
      openFileName: '',
      openFileOptions: [],
      findInFile: '',
      replaceInFile: '',
      goToRowNumber: '',
      matchCase: false,
      foundInFileArray: [],
      findNextCounter: 0,
      replaceCounter: 0,
      saveAsFormFileName: '',
      saveAsFormFileDescription: '',
      fontType: 'monospace',
      fontStyle: 'normal',
      fontSize: '18',      
      prevFontType: 'monospace',
      prevFontStyle: 'normal',
      prevFontSize: '18',
      newSavedGistID: '',
      gistType: 'secret',
      openFileGistID: '',
      openFileGistType: '',
      userGists: [],
      showDevMode: false
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

  componentDidMount () {
    
    this.topLevel.focus()

    const gitHubProvider = new firebase.auth.GithubAuthProvider()
    gitHubProvider.addScope('gist')
    gitHubProvider.setCustomParameters({
      'allow_signup': 'false'
    })
    firebaseApp.auth().signInWithPopup(gitHubProvider).then(function(result) {
      const username = result.additionalUserInfo.username
      // const basicProfile = result.user.providerData
      const token = result.credential.accessToken
      return {username, token}
    })
    .then(({username, token}) => {

      const getOptions = {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`
        }
      }

      const url = `https://api.github.com/users/${username}/gists?per_page=100`
      Api.getGists(url, getOptions, (filesArray) => {
        this.setState((prevState) => {
          const userGists = filesArray
          // scramble is a higher order function with private, immutable state itself
          return {userGists, username, token: scramble(token)(true)}
        })
      })
    })
    .catch(function(err) {
      console.error(err)
    })
  }
  
  switchDevMode() {
    this.setState({showDevMode:!this.state.showDevMode})
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
    }

    return (
        <div className="dialog-box__container">
          <OpenFileBox
            handlers={handlers}
            onGistClick={this.onGistClick}
            openFileHandleSubmit={this.openFileHandleSubmit}
            openFileHandleChange={this.openFileHandleChange}
            handleCancel={this.handleCancel}
            openFileName={this.state.openFileName}
            openFileOptions={this.state.openFileOptions}
            userGists={this.state.userGists}
          />
        </div>
      )
  }

  renderNotSavedWarningBox () {
    const handlers = {
      onSaveYes: this.onClickSaveYes,
      onSaveNo: this.onClickSaveNo,
      onCancel: this.onClickSaveCancel
    }
    
    return ( 
      <div className="dialog-box__container">
        <NotSavedWarningBox
          handlers={handlers}
          onClickSaveYes={this.onClickSaveYes}
          onClickSaveNo={this.onClickSaveNo}
          onClickSaveCancel={this.onClickSaveCancel}
        />
      </div>
    )
  }

  renderSaveAsBox () {
    const handlers = {
      onChange: this.saveAsHandleChange,
      onSubmit: this.saveAsHandleSubmit,
      onCancel: this.handleCancel
    }

    return (
      <div className="dialog-box__container">
        <SaveAsBox 
          handlers={handlers}
          gistType={this.state.gistType}
          saveAsFormFileName={this.state.saveAsFormFileName}
          saveAsFormFileDescription={this.state.saveAsFormFileDescription}
          saveAsHandleChange={this.saveAsHandleChange}
          saveAsHandleSubmit={this.saveAsHandleSubmit}
          handleCancel={this.handleCancel}
        />
      </div>
    )
  }

  renderFindBox () {
    const handlers = {
      // handlers go here
      onChange: this.findInFileHandleChange,
      onCheckBoxChange: this.onCheckBoxChange,
      onSubmit:this.findInFileHandleSubmit,
      onCancel: this.handleCancel
    }

    return (
      <div className="dialog-box__container">
        <FindBox
          findInFile={this.state.findInFile}
          matchCase={this.state.matchCase}
          handlers={handlers}
        />
      </div>
    )
  }

  renderReplaceBox () {
    const handlers = {
      onChange: this.findInFileHandleChange,
      replaceHandleChange: this.replaceHandleChange,
      onCheckBoxChange: this.onCheckBoxChange,      
      onSubmit: this.replaceHandleSubmit,
      onCancel: this.handleCancel,
      replaceAll: this.replaceAll
    }

    return (
      <div className="dialog-box__container">
        <ReplaceBox
          findInFile={this.state.findInFile}
          replaceInFile={this.state.replaceInFile}
          matchCase={this.state.matchCase}
          handlers={handlers}
        />
      </div>
    )
  }
  
  renderGoToBox () {
    const handlers = {
      onSubmit: this.goToLineOnSubmit,
      onChange: this.goToLineHandleChange
    }

    return (
      <div className="dialog-box__container">
        <GoToBox
          handlers={handlers}
          goToRowNumber={this.state.goToRowNumber}
        />
      </div>
    )
  }
  
  renderFontBox () {
    const handlers = {
      onCancel: this.handleCancel,
      handleStyleChange: this.handleFontStyleChange,
      handleTypeChange: this.handleFontTypeChange,
      handleSizeChange: this.handleFontSizeChange,
      onSubmit: this.fontBoxOnSubmit      
    }

    return (
      <div className="dialog-box__container">
        <FontBox
          fontType={this.state.fontType}
          fontStyle={this.state.fontStyle}
          fontSize={this.state.fontSize}
          handlers={handlers}          
        />
      </div>
    )
  }

  renderAboutBox () {
    const handlers = {
      // handlers go here
      onCancel: this.handleCancel,      
    }

    return (
      <div className="dialog-box__container">
        <AboutBox
          handlers={handlers}          
        />
      </div>
    )
  }

  onClickCloseMenuItem (event) {
    const fileMenu = {...this.state.fileMenu}
    const editMenu = {...this.state.editMenu}
    const formatMenu = {...this.state.formatMenu}
    const viewMenu = {...this.state.viewMenu}
    const helpMenu = {...this.state.helpMenu}

    if (!(event.target).closest('.app__menu-bar-container')) {
      this.setState((prevState) => {
        helpMenu.visible = false
        viewMenu.visible = false
        formatMenu.visible = false
        editMenu.visible = false
        fileMenu.visible = false
        return {fileMenu, editMenu, formatMenu, viewMenu, helpMenu}
      })
    }
  }

  onMainMenuClick (event, menuItem) {
    event.stopPropagation()
    const callback = this[menuItem.onClick]
    callback && callback()
  }

  onNotepadMouseDown (event, column, row) {
    event.stopPropagation()    
    const documentSelection = {...this.state.documentSelection}
    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()

    documentCursor.column = column 
    documentCursor.row = row
    documentSelection.selectionStart.column = column 
    documentSelection.selectionStart.row = row
    documentSelection.selectionEnd.column = column 
    documentSelection.selectionEnd.row = row
    documentSelection.isSelected = true
    documentSelection.isSelectedChanging = true
    
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
    event.stopPropagation()    
    const documentSelection = {...this.state.documentSelection}
    const documentCursor = {...this.state.documentCursor}
    if (documentSelection.isSelected && documentSelection.isSelectedChanging) {
      documentCursor.column = column 
      documentCursor.row = row
      documentSelection.selectionEnd.column = column
      documentSelection.selectionEnd.row = row
      this.setState({documentCursor})  
    }
  }

  onNotepadMouseLeave () {
    const documentSelection = {...this.state.documentSelection}
    if (documentSelection.isSelected) {
      documentSelection.isSelectedChanging = false
      this.setState({documentSelection})
    }
  }

  onNotepadMouseUp () {
    const documentSelection = {...this.state.documentSelection}
    if (documentSelection.isSelected) {
      documentSelection.isSelectedChanging = false
      this.setState({documentSelection})
    }
  }

  isSelected (column, row) {
    const documentSelection = {...this.state.documentSelection}
    const documentContent = this.state.documentContent.slice()
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd
    const startEndAreSame = (start, end) => start.column === end.column && start.row === end.row
    if (!documentSelection.isSelected) {
      return false
    }

    if (documentContent[row][column] === undefined) {
      return false
    }
    function indexOfPosition (content, column, row) {
      let index = 0
      let currentRow = 0

      const charactersToCount = (currentRow, rowData) => {
        if (currentRow === row) {
          return 1 + rowData.length + (-1 * (rowData.length - column))
        } else {
          return rowData.length + 1
        }
      }

      while (currentRow <= row) {
        const rowData = content[currentRow]

        if (rowData.length) {
            index += charactersToCount(currentRow, rowData)
          }

        currentRow += 1
      }
      return index
    }

    const startIndex = indexOfPosition(documentContent,start.column, start.row)
    const currentIndex = indexOfPosition(documentContent, column, row)
    const endIndex = indexOfPosition(documentContent,end.column, end.row)

    return documentSelection.isSelected && !startEndAreSame(start,end) && (
      (currentIndex >= startIndex && currentIndex <= endIndex) || (
        (startIndex >= endIndex) && (currentIndex <= startIndex && currentIndex >= endIndex)
      )
    )
  }

  toggleFileMenu () {
    const fileMenu = {...this.state.fileMenu}
    const editMenu = {...this.state.editMenu}
    const formatMenu = {...this.state.formatMenu}
    const viewMenu = {...this.state.viewMenu}
    const helpMenu = {...this.state.helpMenu}
    this.setState((prevState) => {
      helpMenu.visible = false
      viewMenu.visible = false
      formatMenu.visible = false
      editMenu.visible = false
      fileMenu.visible = !prevState.fileMenu.visible
      return {fileMenu, editMenu, formatMenu, viewMenu, helpMenu}
    })
  }

  toggleEditMenu () {
    const fileMenu = {...this.state.fileMenu}
    const editMenu = {...this.state.editMenu}
    const formatMenu = {...this.state.formatMenu}
    const viewMenu = {...this.state.viewMenu}
    const helpMenu = {...this.state.helpMenu}  
    this.setState((prevState) => {
      viewMenu.visible = false
      helpMenu.visible = false
      formatMenu.visible = false
      fileMenu.visible = false
      editMenu.visible = !prevState.editMenu.visible
      return {fileMenu, editMenu, formatMenu, viewMenu, helpMenu}
    })
  }

  toggleFormatMenu () {
    const fileMenu = {...this.state.fileMenu}
    const editMenu = {...this.state.editMenu}
    const formatMenu = {...this.state.formatMenu}
    const viewMenu = {...this.state.viewMenu}
    const helpMenu = {...this.state.helpMenu}   
    this.setState((prevState) => {
      helpMenu.visible = false 
      viewMenu.visible = false 
      editMenu.visible = false 
      fileMenu.visible = false 
      formatMenu.visible = !prevState.formatMenu.visible
      return {fileMenu, editMenu, formatMenu, viewMenu, helpMenu}
    })
  }

  toggleViewMenu () {
    const fileMenu = {...this.state.fileMenu}
    const editMenu = {...this.state.editMenu}
    const formatMenu = {...this.state.formatMenu}
    const viewMenu = {...this.state.viewMenu}
    const helpMenu = {...this.state.helpMenu}
    
    this.setState((prevState) => {
      helpMenu.visible = false
      formatMenu.visible = false
      editMenu.visible = false
      fileMenu.visible = false
      viewMenu.visible = !prevState.viewMenu.visible
      return {fileMenu, editMenu, formatMenu, viewMenu, helpMenu}
    })
  }

  toggleHelpMenu () {
    const fileMenu = {...this.state.fileMenu}
    const editMenu = {...this.state.editMenu}
    const formatMenu = {...this.state.formatMenu}
    const viewMenu = {...this.state.viewMenu}
    const helpMenu = {...this.state.helpMenu}
    
    this.setState((prevState) => {
      fileMenu.visible = false 
      editMenu.visible = false 
      formatMenu.visible = false 
      viewMenu.visible = false 
      helpMenu.visible = !prevState.helpMenu.visible
      return {fileMenu, editMenu, formatMenu, viewMenu, helpMenu}
    })
  }

  onClickSaveYes () {
    const showModal = true
    let dialogBoxType = ''
    this.setState((prevState) => {
      if (!this.state.hasSaved) {
        dialogBoxType = 'renderSaveAsBox'        
      } else {
        dialogBoxType = ''
        this.fileSaveMenu()
      }
      return {showModal, dialogBoxType}
    })
  }
  
  onClickSaveNo () {
    const fileMenu = {...this.state.fileMenu} 
    const warningFromMenuItem = this.state.warningFromMenuItem
    const saved = true
    let fileOpenControl = new Promise((resolve, reject) => {
      this.setState((prevState) => {
        fileMenu.visible = false
        const dialogBoxType = 'renderNotSavedWarningBox'        
        return {fileMenu, saved, dialogBoxType}
      })
      resolve(warningFromMenuItem)
    })

    fileOpenControl.then((priorMenuItem) => {

      switch (priorMenuItem) {
        case 'fileOpenMenu':
          this.setState((prevState) => {
            fileMenu.visible = false
            const dialogBoxType = 'renderOpenFileDialog' 
            const showModal = true             
            return {fileMenu, saved, dialogBoxType, showModal}
          })
          break
        case 'fileNewMenu':
          this.fileNewMenu()
          break
        case 'exitNotepad':
          this.setState({saved:true}, this.exitNotepad)
          break
        default:
          throw new Error('unknown menu item clicked')
      }
    })
  } 
  
  onClickSaveCancel () {
    this.setState((prevState) => {
      const showModal = false
      const saved = true
      return {showModal, saved}
    })
  }

  fileNewMenu () {
    // pop up dialog    
    // set document content to empty
    const documentContent = this.state.documentContent.slice()
    const documentCursor = {...this.state.documentCursor}
    const saved = this.state.saved
    const fileMenu = {...this.state.fileMenu}
    
    
    if (!documentContent.every(line => line === '') && !saved) {
        this.setState((prevState) => {
          const warningFromMenuItem = 'fileNewMenu'
          fileMenu.visible = false
          const showModal = true
          const dialogBoxType = 'renderNotSavedWarningBox'   
          return {fileMenu, showModal, dialogBoxType, warningFromMenuItem}
        })
      return
    }
    
    const nextState = {}
    // just to keep 17 lines for a full textarea look
    const resetDocumentContent = ['','','','','','','','','','','','','','','','','']
    const showModal = false

    documentCursor.row = 0
    documentCursor.column = 0
    nextState.fileMenu.visible = false
    nextState.documentFileName = 'Untitled.txt'
    nextState.documentContent = resetDocumentContent
    nextState.documentCursor = documentCursor
    nextState.saveAsFormFileName = ''
    nextState.saveAsFormFileDescription = ''
    nextState.undoStack = []
    nextState.redoStack = []
    nextState.showModal = showModal

    this.setState(nextState)
    return
  }

  fileOpenMenu (menuItem = null) {
    // display names of all of your gists
    const documentContent = this.state.documentContent.slice()
    const fileMenu = {...this.state.fileMenu}
    const saved = this.state.saved
    const showModal = true

    if (documentContent.every(line => line === '') || saved) {
      this.openModal()

        this.setState((prevState) => {
          const dialogBoxType = 'renderOpenFileDialog'
          fileMenu.visible = false
          return {fileMenu, showModal, dialogBoxType}
        })
    } else if (!saved) {
      this.setState((prevState) => {
        const warningFromMenuItem = 'fileOpenMenu'          
        fileMenu.visible = false
        const dialogBoxType = 'renderNotSavedWarningBox'          
        return {fileMenu, showModal, dialogBoxType, warningFromMenuItem}
      })
    }
    
  }

  onGistClick (event, gist) {
    const documentCursor = {...this.state.documentCursor}
    const options = {
      method: 'GET'
    }

    Api.openGist (gist.url, options)    
    .then ( newDocumentContent => {
      const nextState = {}

      documentCursor.row = 0
      documentCursor.column = 0
      
      nextState.documentCursor = documentCursor
      nextState.documentFileName = gist.name
      nextState.documentContent = newDocumentContent
      nextState.openFileGistID = gist.id
      nextState.openFileGistType = gist.public
      nextState.saved = true
      nextState.hasSaved = true
      nextState.showModal = false
      this.setState(nextState)
    })
    .then (this.closeModal())
    .catch ( error => {
      console.error(`gist fetch error: ${error}`)
    })
  }

  openFileHandleChange (event) {
    const userGists = this.state.userGists.slice()
    const result = typeAhead(event.target.value.toString(), userGists)
    this.setState({
      openFileName: event.target.value,
      openFileOptions: result,
    })
    
  }

  openFileHandleSubmit (event) {
    const gist = this.state.openFileOptions
    event.preventDefault()
    const documentCursor = {...this.state.documentCursor}
    const options = {
      method: 'GET'
    }

    Api.openGist (gist[0].url, options)    
    .then ( newDocumentContent => {
      const nextState = {}

      documentCursor.row = 0
      documentCursor.column = 0
      nextState.documentCursor = documentCursor
      nextState.documentFileName = gist[0].name
      nextState.documentContent = newDocumentContent
      nextState.openFileGistID = gist[0].id
      nextState.openFileGistType = gist[0].public
      nextState.saved = true // MIGHT need to change...
      nextState.hasSaved = true
      nextState.showModal = false
      this.setState(nextState)
    })
    .then (this.closeModal())
    .catch ( error => {
      console.error(`gist fetch error: ${error}`)
    })
    
  }

  fileSaveMenu (menuItem) {
    // save to your gists
    const fileMenu = {...this.state.fileMenu}
    // const token = this.state.token
    const token = scramble(false)
    const hasSaved = this.state.hasSaved
    const saved = true
    const showModal = true 
    if (hasSaved) {
      const documentFileName = this.state.documentFileName
      const documentContent = this.state.documentContent.slice()
      const currentFileDescription = this.state.saveAsFormFileDescription
      const gistID = this.state.openFileGistID || this.state.newSavedGistID
      const gistType = this.state.gistType

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


      const patchOptions = {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${token}`
        },
        body: JSON.stringify(patchContent)
      }

      Api.saveGist(url, patchOptions)

      this.setState((prevState) => {
        fileMenu.visible =  false
        return {fileMenu, saved}
      })
    } else {
      this.setState((prevState) => {
        const dialogBoxType = "renderSaveAsBox"
        fileMenu.visible = false
        return {fileMenu, showModal, dialogBoxType}
      })
    }
  }
  fileSaveAsMenu (menuItem) {
    // ask you for different name and where to save it
    const fileMenu = {...this.state.fileMenu}
    const showModal = true

    this.setState((prevState) => {
      const dialogBoxType = "renderSaveAsBox"
      fileMenu.visible = false
      return {fileMenu, showModal, dialogBoxType}
    })
  }

  saveAsHandleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  saveAsHandleSubmit (event) {
    event.preventDefault()  
    const gistType = this.state.gistType  
    const fileMenu = {...this.state.fileMenu}   
    const token =  scramble(false) //this.state.token
    const username = this.state.username
    const documentFileName = this.state.saveAsFormFileName   
    const newFileDescription = this.state.saveAsFormFileDescription
    const documentContent = this.state.documentContent.slice()
    const hasSaved = true
    const saved = true
    const showModal = false
    const url = `https://api.github.com/gists`   

    const getOptions = {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`
      }
    }

    const postContent = {
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
        'Authorization': `token ${token}`        
      },
      body: JSON.stringify(postContent)
    }

    const userGistsUrl = `https://api.github.com/users/${username}/gists?per_page=100`

    this.setState((prevState) => {
      return {documentFileName, hasSaved,saved, showModal}     
    })

    const updateGists = () => {
      return Api.getGists(userGistsUrl, getOptions, (filesArray) => {
        this.setState((prevState) => {
          const newSavedGistID = filesArray[0][0].id
          const userGists = filesArray
          fileMenu.visible = false
          return {fileMenu, showModal, saved, hasSaved, newSavedGistID, userGists}
        })
      })
    }

    return Api.saveAsGist(url, postOptions).then(updateGists)
    
  }

  handleCancel (event) {
    event.preventDefault()
    const showModal = false
    const fontType = this.state.prevFontType
    const fontStyle= this.state.prevFontStyle
    const fontSize= this.state.prevFontSize
    this.setState({
      showModal,
      fontType,
      fontStyle,
      fontSize
    })
  }

  findInFileHandleChange (event) {
    const documentContent = this.state.documentContent.slice()
    const findInFile = event.target.value.toString()
    const matchCase = this.state.matchCase
    const foundInFileArray = selectFindText(findInFile,documentContent,matchCase)
    this.setState({
      [event.target.name]: event.target.value,
      foundInFileArray
    })
  }

  replaceHandleChange (event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onCheckBoxChange (event) {
    this.setState({matchCase: event.target.checked})
  }

  findInFileHandleSubmit (event) {
    event.preventDefault()
    const editMenu = {...this.state.editMenu} 
    let findNextCounter = this.state.findNextCounter
    const documentSelection = {...this.state.documentSelection}
    const foundInFileArray = this.state.foundInFileArray.slice()

    if(!foundInFileArray.length) {
      documentSelection.selectionStart = {
        row: 0,
        column: 0
      }
      documentSelection.selectionEnd = {
        row: 0,
        column: 0
      }
      documentSelection.isSelected = false
      documentSelection.isSelectedChanging = false
      this.setState({documentSelection})
      return
    }

    if(!foundInFileArray[findNextCounter]) {
      (findNextCounter = 0) 
      const found = foundInFileArray[findNextCounter]

      documentSelection.selectionStart = {
        column: found.startColumn,
        row: found.row
      }

      documentSelection.selectionEnd = {
        column: found.endColumn,
        row: found.row
      }

      documentSelection.isSelected = true
      documentSelection.isSelectedChanging = true
      findNextCounter++
    } else {
      const found = foundInFileArray[findNextCounter]

      documentSelection.selectionStart = {
        column: found.startColumn,
        row: found.row
      }

      documentSelection.selectionEnd = {
        column: found.endColumn,
        row: found.row
      }

      documentSelection.isSelected = true
      documentSelection.isSelectedChanging = true
      findNextCounter++
    }
    this.setState((prevState) => {
      editMenu.visible = false
      return {editMenu, findNextCounter, documentSelection}
    })
  }

  replaceAll (event) {
    event.preventDefault()
    const foundInFileArray = this.state.foundInFileArray.slice()

    if (!foundInFileArray.length) {
      return
    }

    const documentContent = this.state.documentContent.slice()
    const replaceInFile = this.state.replaceInFile
    const undoStack = this.state.undoStack.slice()
    const editMenu = this.state.editMenu
    editMenu.visible = false

    const replace = (documentContent, startIndex,endIndex, pasteData, offset) => {
      const joiner = String.fromCharCode(0xbb)
      const text = documentContent.join(joiner)
      const left = text.substr(0, startIndex - 1)
      const right = text.substr(endIndex, text.length)
      const replaceModifiedDoc = `${left}${pasteData}${right}`.split(joiner)
      return replaceModifiedDoc
    }

    function replaceOp (documentContent,foundItem) {
      // to account for length differences of found string and
      // replace string
      if (!foundItem) {
        return documentContent
      }
      const offset = replaceInFile.length - foundItem.data.length
      const foundInFileArray = selectFindText(foundItem.data,documentContent,false)

      const afterReplace = replace(documentContent, 
          getIndexOfPosition(documentContent,{
            column: foundInFileArray[0].startColumn,
            row: foundInFileArray[0].row
          }),
          getIndexOfPosition(documentContent,{ 
            column: foundInFileArray[0].endColumn,
            row: foundInFileArray[0].row
          }),
          replaceInFile.toString(),
          offset
        )
      return afterReplace
    }

    let postReplaceDoc = documentContent
    for (let foundItem in foundInFileArray) {
      postReplaceDoc = replaceOp(postReplaceDoc,foundInFileArray[foundItem])
    }

    const nextStackItem = {}
    nextStackItem.event = 'replaceAll'
    nextStackItem.original = documentContent
    nextStackItem.postDocument = postReplaceDoc

    undoStack.push(nextStackItem)

    this.setState({
      editMenu, 
      undoStack, 
      documentContent: postReplaceDoc,
      findInFile: '',
      replaceInFile: '',
      foundInFileArray: []
    })

  }
  
  replaceHandleSubmit (event) {
    event.preventDefault()

    let replaceCounter = this.state.replaceCounter
    const documentContent = this.state.documentContent.slice()
    const replaceInFile = this.state.replaceInFile
    const foundInFileArray = this.state.foundInFileArray.slice()
    
    if (!foundInFileArray.length) {
      return
    }
    const undoStack = this.state.undoStack.slice()
    const replace = (documentContent, startIndex,endIndex, pasteData, offset) => {
      const joiner = String.fromCharCode(0xbb)
      const text = documentContent.join(joiner)
      const left = text.substr(0, startIndex - 1)
      const right = text.substr(endIndex, text.length)
      const pasteModifiedDoc = `${left}${pasteData}${right}`.split(joiner)
      return pasteModifiedDoc
    }


    function replaceOp (documentContent,foundItem) {
      if (!foundItem) {
        return documentContent
      }
      const offset = replaceInFile.length - foundItem.data.length
      const foundInFileArray = selectFindText(foundItem.data,documentContent,false)
      const afterReplace = replace(documentContent, 
          getIndexOfPosition(documentContent,{
            column: foundInFileArray[0].startColumn,
            row: foundInFileArray[0].row
          }),
          getIndexOfPosition(documentContent,{ 
            column: foundInFileArray[0].endColumn,
            row: foundInFileArray[0].row
          }),
          replaceInFile.toString(),
          offset
        )
      return afterReplace
    }

    let postReplaceDoc = documentContent
    
    if (!foundInFileArray[replaceCounter]) {
      return
    }
      postReplaceDoc = replaceOp(postReplaceDoc,foundInFileArray[replaceCounter])

    replaceCounter++

    const nextStackItem = {}
    nextStackItem.event = 'replace'
    nextStackItem.original = documentContent
    nextStackItem.postDocument = postReplaceDoc

    undoStack.push(nextStackItem)

    this.setState({
      documentContent: postReplaceDoc, 
      replaceCounter,
      undoStack,
    })
    
  }

  goToLineHandleChange (event) {
    if (!parseInt(event.target.value, 10)) {
      this.setState({[event.target.name]: ''})
      return
    } else {
      this.setState({[event.target.name]: parseInt(event.target.value,10)})
    }
  }

  goToLineOnSubmit (event) {
    event.preventDefault()
    let goToRowNumber = this.state.goToRowNumber
    const documentContent = this.state.documentContent.slice()
    const documentCursor = {...this.state.documentCursor}
    if (goToRowNumber > documentContent.length - 1) {
      goToRowNumber = documentContent.length - 1
    }
    if (!goToRowNumber) {
      goToRowNumber = documentCursor.row
    }
    this.setState((prevState) => {
      const showModal = false
      documentCursor.row = goToRowNumber
      documentCursor.column = 0
      return {goToRowNumber, showModal, documentCursor}
    })
    this.topLevel.focus()

  }

  fontBoxOnSubmit (event) {
    event.preventDefault()

    const documentContent = this.state.documentContent.slice()
    const showModal = false
    const prevFontType = this.state.fontType
    const prevFontStyle = this.state.fontStyle
    const prevFontSize = this.state.fontSize

    this.setState({
      documentContent, 
      showModal,
      prevFontType,
      prevFontStyle,
      prevFontSize
    })
    
  }

  handleFontTypeChange (event) {
    this.setState({fontType: event.target.value})
  }
  
  handleFontStyleChange (event) {
    this.setState({fontStyle: event.target.value})
  }
    
  handleFontSizeChange (event) {
    this.setState({fontSize: parseInt(event.target.value,10)})    
  }
  printMenu (menuItem) {
    const fileMenu = {...this.state.fileMenu}    
    window.print()
    this.setState((prevState) => {
      fileMenu.visible = false
      return {fileMenu}
    })
  }

  exitNotepad (menuItem) {
    // navigate to user's homepage or google.com if IE
    const fileMenu = {...this.state.fileMenu}    
    const documentContent = this.state.documentContent.slice()
    const saved = this.state.saved

    if (!documentContent.every(line => line === '') && !saved) {
        this.setState((prevState) => {
          const warningFromMenuItem = 'exitNotepad'
          fileMenu.visible = false
          const showModal = true
          const dialogBoxType = 'renderNotSavedWarningBox'          
          return {fileMenu, dialogBoxType, showModal, warningFromMenuItem}
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
    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice() 
    const redoStack = this.state.redoStack.slice()   
    const topLayer = undoStack.slice(undoStack.length - 1)

    function stackOps (stackLayer) {
      /**
      *  @param {Array} stackLayer - stack of layer to perform ops on
      */        
      
      if (undoStack.length) {
        const afterUndoDoc = stackLayer[0].original

        redoStack.push(undoStack.pop())
        return afterUndoDoc   
      } 
      
      return documentContent
    }

    const afterUndoDoc = stackOps(topLayer)

    this.setState({
      documentContent: afterUndoDoc,
      undoStack,
      redoStack,
      documentCursor
    })
  }

  editRedo (menuItem) {

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
        const afterRedoDoc = stackLayer[0].postDocument

        undoStack.push(redoStack.pop())
        return afterRedoDoc         
      } 
      
      return documentContent
    }
      const afterRedoDoc = stackOps(topLayer)

      this.setState({
        documentContent: afterRedoDoc,
        undoStack,
        redoStack,
        documentCursor
      })
  }

  editCut (){
    const documentSelection = {...this.state.documentSelection}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice()
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd
    const editMenu = {...this.state.editMenu}    
    const documentCursor = {...this.state.documentCursor}
    
    if (start.column === end.column && start.row === end.row) {
      editMenu.visible = false
      this.setState({editMenu})
      return 
    }

    const cut = (content, { start, end }) => {
      let startIndex = getIndexOfPosition(content, start)
      let endIndex = getIndexOfPosition(content, end)

      if (startIndex > endIndex) {
        let tempIndex = startIndex
        startIndex = endIndex
        endIndex = tempIndex
        documentCursor.row = end.row
        documentCursor.column = end.column
      } else {
        documentCursor.row = start.row
        documentCursor.column = start.column        
      }
      const joiner = String.fromCharCode(0xbb)
      const text = content.join(joiner)
      const left = text.substr(0, startIndex - 1)
      const right = text.substr(endIndex, text.length)
      const data = text.substr(startIndex - 1, 1+ endIndex - startIndex)
      const postDocument = `${left}${right}`.split(joiner)

      const result = {
        original: content,
        data,
        postDocument
      }

      const nextStackItem = {
        startIndex,
        endIndex,
        postDocument,
        original:content,
        event: 'editCut'
      }

      undoStack.push(nextStackItem)

      return result
    }

    const postCutDocument = cut(documentContent, {start, end})

    this.setState((prevState) => {
      editMenu.visible = false
      const documentContent = postCutDocument.postDocument
      documentSelection.result = postCutDocument
      documentSelection.selectionStart = {
        row: 0,
        column: 0
      }
      documentSelection.selectionEnd = {
        row: 0,
        column: 0
      }
      documentSelection.isSelected = false
      documentSelection.isSelectedChanging = false
      return {
        editMenu, 
        undoStack, 
        documentContent, 
        documentSelection,
        documentCursor
      }
    })
    const myObject = {postCutDocument, documentCursor}
    return Promise.resolve(myObject)
  }

  editCopy (){
    // virtual clipboard copy   
    const documentSelection = {...this.state.documentSelection}
    const documentContent = this.state.documentContent.slice()
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd
    const editMenu = {...this.state.editMenu} 
    
    if (start.column === end.column && start.row === end.row) {
      editMenu.visible = false
      this.setState({editMenu})
      return 
    }

    const copy = (content, { start, end }) => {
      let startIndex = getIndexOfPosition(content, start)
      let endIndex = getIndexOfPosition(content, end)
      if (startIndex > endIndex) {
        let tempIndex = startIndex
        startIndex = endIndex
        endIndex = tempIndex
      }
      const joiner = String.fromCharCode(0xbb)
      const text = content.join(joiner)
      const left = text.substr(0, startIndex - 1)
      const right = text.substr(endIndex, text.length)
      const data = text.substr(startIndex - 1, 1 + endIndex - startIndex)
      const postDocument = `${left}${right}`.split(joiner)

      const result = {
        original: content,
        start: startIndex,
        end: endIndex,
        length: data.length,
        data,
        postDocument
      }

      return result
    }

    const postCopyDocument = copy(documentContent, {start, end})

    this.setState((prevState) => {
      editMenu.visible = false
      documentSelection.result = postCopyDocument
      documentSelection.data = postCopyDocument.data
      return {editMenu, documentSelection}
    })
  }

  editPaste (){
    // virtual clipboard paste
    const documentSelection = {...this.state.documentSelection}
    const pasteData = documentSelection.result.data
    
    if (!pasteData) {
      return
    }
    
    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice()
    let start = documentSelection.selectionStart    
    let end = documentSelection.selectionEnd 
    let startIndex
    let endIndex
    if (start.row === end.row && start.column === end.column) {
      startIndex = endIndex = getIndexOfPosition(documentContent, documentCursor)
    } else {
      startIndex = getIndexOfPosition(documentContent, start)
      endIndex = getIndexOfPosition(documentContent, end)
    }

    const paste = (documentContent, startIndex,endIndex, pasteData) => {
      const joiner = String.fromCharCode(0xbb)
      const text = documentContent.join(joiner)
      const left = text.substr(0, startIndex - 1)
      const right = text.substr(endIndex - 1, text.length)
      const pasteModifiedDoc = `${left}${pasteData}${right}`.split(joiner)
      return pasteModifiedDoc
    }

    const pasteModifiedDoc = paste(documentContent,startIndex,endIndex,pasteData)

    const nextStackItem = {
      original: documentContent,
      postDocument:pasteModifiedDoc,
      startIndex,
      endIndex,
      pasteData,
      event: 'editPaste'
    }

    undoStack.push(nextStackItem)

    this.setState((prevState) => {
      const documentContent = pasteModifiedDoc
      editMenu.visible = false      
      documentSelection.selectionStart = {
        row: 0,
        column: 0
      }
      documentSelection.selectionEnd = {
        row: 0,
        column: 0
      }
      documentSelection.isSelected = false
      documentSelection.isSelectedChanging = false
      return {
        editMenu, 
        undoStack, 
        documentContent, 
        documentSelection,
        documentCursor
      }
    })

  }

  editDelete () {
    // delete selection
    const documentSelection = {...this.state.documentSelection}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice()
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd
    const editMenu = {...this.state.editMenu}    
    const documentCursor = {...this.state.documentCursor}
    
    
    if (start.column === end.column && start.row === end.row) {
      editMenu.visible = false
      this.setState({editMenu})
      return 
    }
    const deleteContent = (content, { start, end }) => {
      let startIndex = getIndexOfPosition(content, start)
      let endIndex = getIndexOfPosition(content, end)
      if (startIndex > endIndex) {
        let tempIndex = startIndex
        startIndex = endIndex
        endIndex = tempIndex
        documentCursor.row = end.row
        documentCursor.column = end.column
      } else {
        documentCursor.row = start.row
        documentCursor.column = start.column        
      }
      const joiner = String.fromCharCode(0xbb)
      const text = content.join(joiner)
      const left = text.substr(0, startIndex - 1)
      const right = text.substr(endIndex, text.length)
      const data = text.substr(startIndex - 1, 1 + endIndex - startIndex)
      const postDocument = `${left}${right}`.split(joiner)

      const result = {
        original: content,
        start: startIndex,
        end: endIndex,
        length: data.length,
        data,
        postDocument
      }

      const nextStackItem = {
        original: content,    
        postDocument,    
        result: {...result},
        event: 'editDelete'
      }

      undoStack.push(nextStackItem)

      return result
    }

    const postCutDocument = deleteContent(documentContent, {start, end})

    this.setState((prevState) => {
      editMenu.visible = false
      const documentContent = postCutDocument.postDocument
      documentSelection.selectionStart = {
        row: 0,
        column: 0
      }
      documentSelection.selectionEnd = {
        row: 0,
        column: 0
      }
      documentSelection.isSelected = false
      documentSelection.isSelectedChanging = false
      return {
        editMenu, 
        undoStack, 
        documentContent, 
        documentSelection,
        documentCursor
      }
    })
  }

  editFind () {
    // open up Find dialog, then finds character sequence 
    const editMenu = {...this.state.editMenu}
    
    this.setState((prevState) => {
      const showModal = true
      const dialogBoxType = "renderFindBox"
      editMenu.visible = false
      return {editMenu, showModal, dialogBoxType}
    })         
  }

  editFindNext () {
    // finds next occurrence of current 
    const documentContent = this.state.documentContent.slice()
    const joiner = String.fromCharCode(0xbb)
    const text = documentContent.join(joiner)
    const documentSelection = {...this.state.documentSelection}
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd
    let startIndex = getIndexOfPosition(documentContent,start)
    let endIndex = getIndexOfPosition(documentContent,end) 
    const matchCase = false
    if (startIndex > endIndex) {
      let tempIndex = startIndex
      startIndex = endIndex
      endIndex = tempIndex
    }

    const data = text.substr(startIndex - 1, 1 + endIndex - startIndex)
    const foundInFileArray = selectFindText(data,documentContent,matchCase)
    let findNextCounter = this.state.findNextCounter

    if(!foundInFileArray.length) {
      documentSelection.selectionStart = {
        row: 0,
        column: 0
      }
      documentSelection.selectionEnd = {
        row: 0,
        column: 0
      }
      documentSelection.isSelected = false
      documentSelection.isSelectedChanging = false
      this.setState({documentSelection})
      return
    }

    if(!foundInFileArray[findNextCounter]) {
      (findNextCounter = 0) 
      const found = foundInFileArray[findNextCounter]

      documentSelection.selectionStart = {
        column: found.startColumn,
        row: found.row
      }

      documentSelection.selectionEnd = {
        column: found.endColumn,
        row: found.row
      }

      documentSelection.isSelected = true
      documentSelection.isSelectedChanging = false
      findNextCounter++
    } else {
      const found = foundInFileArray[findNextCounter]

      documentSelection.selectionStart = {
        column: found.startColumn,
        row: found.row
      }

      documentSelection.selectionEnd = {
        column: found.endColumn,
        row: found.row
      }

      documentSelection.isSelected = true
      documentSelection.isSelectedChanging = true
      findNextCounter++
    }
    this.setState((prevState) => {
      editMenu.visible = true
      return {editMenu, findNextCounter, documentSelection, foundInFileArray}
    })
  }

  editReplace () {
    // open up find and replace dialog
    const editMenu = {...this.state.editMenu}
    this.setState((prevState) => {
      const showModal = true
      const dialogBoxType = "renderReplaceBox"
      editMenu.visible = false
      return {editMenu, showModal, dialogBoxType}
    })          
  }

  editGoTo () {
    // go to specific line number 
    const editMenu = {...this.state.editMenu}        
    this.setState((prevState) => {
      const showModal = true
      const dialogBoxType = "renderGoToBox"
      editMenu.visible = false
      return {editMenu, showModal, dialogBoxType}
    })        
  }

  editSelectAll () {
    // select all text
    const documentSelection = {...this.state.documentSelection}
    const documentContent = this.state.documentContent.slice()
    const editMenu = {...this.state.editMenu}

    editMenu.visible = false
    documentSelection.isSelected = true
    documentSelection.selectionStart = {
      column: 0,
      row: 0
    }

    documentSelection.selectionEnd = {
      row: documentContent.length - 1,
      column: documentContent[documentContent.length - 1].length
    }

    this.setState({documentSelection, editMenu})
  }

  editTimeDate () {
    // inputs current time stamp at current cursor position
    const date = new Date()

    const documentSelection = {...this.state.documentSelection}
    
    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice()

    let start = documentSelection.selectionStart    
    let end = documentSelection.selectionEnd 
    let startIndex
    let endIndex
    
    if (start.row === end.row && start.column === end.column) {
      startIndex = endIndex = getIndexOfPosition(documentContent, documentCursor)
    } else {
      startIndex = getIndexOfPosition(documentContent, start)
      endIndex = getIndexOfPosition(documentContent, end)
    }

    const insertDate = (documentContent, startIndex,endIndex, dateString) => {
      const joiner = String.fromCharCode(0xbb)
      const text = documentContent.join(joiner)
      const left = text.substr(0, startIndex - 1)
      const right = text.substr(endIndex - 1, text.length)
      const pasteModifiedDoc = `${left}${dateString}${right}`.split(joiner)
      return pasteModifiedDoc
    }

    const insertDateDoc = insertDate(documentContent,startIndex,endIndex,date.toLocaleString())

    const nextStackItem = {
      documentContent,
      insertDateDoc,
      startIndex,
      endIndex,
      dateString: date.toLocaleString(),
      event: 'editTimeDate'
    }

    undoStack.push(nextStackItem)

    this.setState((prevState) => {
      const documentContent = insertDateDoc
      documentCursor.column += date.toLocaleString().length
      editMenu.visible = false      
      documentSelection.selectionStart = {
        row: 0,
        column: 0
      }
      documentSelection.selectionEnd = {
        row: 0,
        column: 0
      }
      documentSelection.isSelected = false
      documentSelection.isSelectedChanging = false
      return {
        editMenu, 
        undoStack, 
        documentContent, 
        documentSelection,
        documentCursor
      }
    })


  }

  formatFont  () {
    // change font of entire text including font type, font style type, and font size 
    const formatMenu = {...this.state.formatMenu}
    this.setState((prevState) => {
      const showModal = true
      const dialogBoxType = "renderFontBox"
      formatMenu.visible = false
      return {formatMenu, showModal, dialogBoxType}
    })          
  }

  viewStatusBar () {
    const viewMenu = {...this.state.viewMenu}
    this.setState((prevState) => {
      const statusBarVisible = !prevState.statusBarVisible
      viewMenu.visible = false
      return {viewMenu, statusBarVisible}
    })
  }

  viewHelp () {
    // directs to the project repo site
    const helpMenu = {...this.state.helpMenu}
    this.setState((prevState) => {
      helpMenu.visible = false
      return {helpMenu}
    })     
    window.open('https://github.com/stephenc222/react-notepad', '_blank')
    return
  }

  helpAboutNotepad () {
    // basic about this application stuff
    const helpMenu = {...this.state.helpMenu}        
    this.setState((prevState) => {
      const showModal = true
      const dialogBoxType = "renderAboutBox"
      helpMenu.visible = false
      return {helpMenu, showModal, dialogBoxType}
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
    const post = rowContent.slice(documentCursor.column + 1)

    changeRow(`${pre}${post}`)
  }

  insertCharacter (character, documentCursor, documentContent) {
    const rowContent = documentContent[documentCursor.row]
    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    if (documentCursor.column === 0) {
      changeRow(`${character}${rowContent}`)
    } else if (documentCursor.column === rowContent.length - 1) {
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
    const documentSelection = {...this.state.documentSelection}
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd

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
      metaKey,
      keyCode,
    } = event

    const isKey = (keyMatch) => keyCode === keyMatch

    if (CURSOR_KEYS.indexOf(keyCode) !== -1) {
      updateCursor = true
    }

    const nextStackItem = {}
    nextStackItem.original = documentContent.slice()

    if (isKey(KEY.BACKSPACE)) {
      event.preventDefault()
      if (start.column === end.column && start.row === end.row) {
        nextStackItem.value = documentContent[documentCursor.row][documentCursor.column - 1]      
        this.insertBackspace(documentCursor, documentContent)
        const row = documentCursor.row
        const column = documentCursor.column - 1
        nextStackItem.index = getIndexOfPosition(
          documentContent,
          {column, row})            
        nextStackItem.event = 'insertBackspace' 
        nextStackItem.postDocument = documentContent        
        if (nextStackItem.value) {
          undoStack.push(nextStackItem)
        }          
        updateCursor = true
        updateDocument = true
      } else {
        this.editCut()
      }
        
    } else if (isKey(KEY.DELETE)) {
      event.preventDefault()
      if (start.column === end.column && start.row === end.row) {
        nextStackItem.value = documentContent[documentCursor.row][documentCursor.column]      
        this.insertDelete(documentCursor, documentContent)
        nextStackItem.postDocument = documentContent.slice()
        updateCursor = true
        updateDocument = true
        nextStackItem.index = getIndexOfPosition(documentContent,{...this.state.documentCursor})    
        nextStackItem.event = 'insertDelete'  
        if (nextStackItem.value) {
          undoStack.push(nextStackItem)
        }
      } else {
        this.editCut()
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
      charCode,
      keyCode,
      shiftKey
    } = event

    let updateDocument = false
    const documentSelection = {...this.state.documentSelection}
    const documentContent = this.state.documentContent.slice()
    const documentCursor = {...this.state.documentCursor}
    const undoStack = this.state.undoStack.slice()
    const start = documentSelection.selectionStart
    const end = documentSelection.selectionEnd
    const saved = false

    if (charCode === KEY.ENTER) {
      updateDocument = true
      this.insertCarriageReturn(documentCursor, documentContent)
      this.setState({documentContent,documentCursor, undoStack, saved})      
    } else if (charCode && !keyCode) {
        const insert = (documentContent,documentCursor, original) => {
          updateDocument = true
          const character = String.fromCharCode(charCode)
          this.insertCharacter(shiftKey
            ? character.toUpperCase()
            : character,
            documentCursor, documentContent)
          const nextStackItem = {}
          nextStackItem.original = original
          nextStackItem.postDocument = documentContent
          nextStackItem.index = getIndexOfPosition(documentContent,documentCursor) 
          nextStackItem.event = 'insertCharacter'  
          undoStack.push(nextStackItem)         
          documentCursor.column += 1 
          this.setState({documentContent,documentCursor, undoStack, saved})
          
        }
      if (start.column === end.column && start.row === end.row) {
        
        insert(documentContent,documentCursor, this.state.documentContent)
        return
        
      } else {
        this.editCut().then((myObject) => {
          const {postCutDocument, documentCursor} = {...myObject}
          insert(postCutDocument.postDocument,documentCursor, postCutDocument.original)
        })
        return 
      }      
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
              mainMenu={
                [
                  this.state.fileMenu,
                  this.state.editMenu,
                  this.state.formatMenu,
                  this.state.viewMenu,
                  this.state.helpMenu,
                ]
              } 
              onMainMenuClick={this.onMainMenuClick}
              onMouseUp={this.onNotepadMouseUp}  
            />
          </div>
          <div className="app__document-container">
            <NotePad
              fontStyle={this.state.fontStyle}
              fontType={this.state.fontType}
              fontSize={this.state.fontSize}
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
            <StatusBar 
              cursor={this.state.documentCursor}
              statusBarVisible={this.state.statusBarVisible}
              cursorIndex={
                getIndexOfPosition(
                  this.state.documentContent,
                  {...this.state.documentCursor}
                )
              }
            />
          </div>
          {/* conditional render for performance boost when not in dev mode*/}
          {this.state.showDevMode && <div className="dev__stack-view-container">
              <UndoStackView
                undoStackObject={this.state.undoStack}
              />
              <RedoStackView
                redoStackObject={this.state.redoStack}
              />
            </div>}
        </div>
        {this.state.showModal && this.renderModal()}
      </div>
    )
  }
}

export default App