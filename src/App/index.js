import React, { Component } from 'react'
// also import PropTypes
import MainMenu from './MainMenu'
import mainMenuData from './mainMenuData'
import NotePad from './Notepad'
import StatusBar from './StatusBar'

// components for development purposes
import RedoStackView from './RedoStackView'
import UndoStackView from './UndoStackView'

import './index.css'

const mockData = [
  '',
  '',
  '',
  // 'Testing this App text input area',
  // 'This is the second line',
  // 'And a third line of more text also',
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
    this.onMainMenuClick = this.onMainMenuClick.bind(this)    
    this.toggleFileMenu = this.toggleFileMenu.bind(this)

    this.toggleEditMenu = this.toggleEditMenu.bind(this)
    this.editUndo = this.editUndo.bind(this)
    this.editRedo = this.editRedo.bind(this)

    this.toggleFormatMenu = this.toggleFormatMenu.bind(this)

    this.toggleViewMenu = this.toggleViewMenu.bind(this)

    this.toggleHelpMenu = this.toggleHelpMenu.bind(this)

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

    // audio object
    this.audioContext = new window.AudioContext()
    this.audioGainNode = this.audioContext.createGain()
    this.audioGainNode.connect(this.audioContext.destination)
    this.audioGainNode.gain.value = 0.15

    // beep sound effect when backspace is pressed and cursor at
    // the beginning of a line
    this.beep = () => {
      const oscillator = this.audioContext.createOscillator()
      oscillator.type = 'square'
      oscillator.frequency.value = 120
      oscillator.connect(this.audioGainNode)
      oscillator.start()
      oscillator.stop(this.audioContext.currentTime + 0.15)
    }
    
    this.state = {
      mainMenuData,
      documentCursor: CURSOR_HOME,
      documentContent: mockData,
      documentSelection: {
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
        // {0:'item #1 -undo', position: 10}, 
        // {1:'and item #2', position: 25},
        // {2: 'item #3', position: 34},
        // {3: 'four', position: 54},
      // ],
      redoStack: []
        // {0:'item #1 -redo', position: 90}, 
        // {1:'and item #2', position: 20},
        // {2: 'item #3', position: 30},
        // {3: 'jack', position: 34},
      //]
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
      mainMenuData.topLevel.items[4].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[3].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[2].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[1].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[0].subLevel.visible = !prevState.mainMenuData.topLevel.items[0].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleFileMenu!')
  }

  toggleEditMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[4].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[3].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[2].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[0].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[1].subLevel.visible = !prevState.mainMenuData.topLevel.items[1].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleEditMenu!')
  }

  toggleFormatMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[4].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[3].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[1].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[0].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[2].subLevel.visible = !prevState.mainMenuData.topLevel.items[2].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleFormatMenu!')
  }

  toggleViewMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[4].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[2].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[1].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[0].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[3].subLevel.visible = !prevState.mainMenuData.topLevel.items[3].subLevel.visible
      return {mainMenuData}
    })
    console.log('hey, this runs inside toggleViewMenu!')
  }

  toggleHelpMenu () {
    const mainMenuData = {...this.state.mainMenuData}
    this.setState((prevState) => {
      mainMenuData.topLevel.items[0].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[1].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[2].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
      mainMenuData.topLevel.items[3].subLevel.visible = false //!prevState.mainMenuData.topLevel.items[0].subLevel.visible
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
    const documentCursor = {...this.state.documentCursor}
    // console.log(menuItem)
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice() 
    const redoStack = this.state.redoStack.slice()   
    //console.log ('New editUndo logs here:')
    //console.log(undoStack)

    // TODO: contains top layer of stack before pop

    // peek, ops then pop
    const topLayer = undoStack.slice(undoStack.length - 1)
    function stackOps (stackLayer) {
      /**
      * @param {Array} stackLayer - stack of layer to perform ops on
      */

      const top = stackLayer.length - 1
      
      if (undoStack.length) {
        console.log("Undo - stackOps:")        
        if(stackLayer[stackLayer.length- 1].event === 'insertCharacter') {
          console.log(`stack value: ${JSON.stringify(stackLayer[top])}`)

          const test = documentContent[stackLayer[top].position.row].split('')

          console.log('Undo test: ')
          console.log(test[stackLayer[top].position.column -1])
          console.log(test)

        } else if (stackLayer[top].event === 'insertBackspace') {
          /*
          TODO: implement this here to 'undo' insertBackspace
          $r.state.documentContent
          ["abc", "", "", "", "", "", "", "", "", "", "", "", ""]
          const nextState = {}
          undefined
          const test = $r.state.documentContent[0].split('')
          undefined
          test.push('z')
          4
          test
          ["a", "b", "c", "z"]
          $r.state.documentContent[0] = test.join('')
          "abcz"
          $r.state.documentContent
          ["abcz", "", "", "", "", "", "", "", "", "", "", "", ""]
          nextState.documentContent = $r.state.documentContent
          ["abcz", "", "", "", "", "", "", "", "", "", "", "", ""]
          $r.setState(nextState) // updates documentContent correctly
          */
          console.log(`UNDO - inside insertBackspace if block: 
            ${JSON.stringify(stackLayer[top])}`)
          
          const peekLayer = undoStack[undoStack.length - 2]
          console.log(undoStack[undoStack.length - 2])
          console.log(peekLayer[undoStack.length -2])
          console.log('row: ' + peekLayer.position.row)
          console.log('column: ' + peekLayer.position.column)
          console.log(JSON.stringify(documentContent))
          console.log(JSON.stringify(documentCursor))

          const addBackChar = documentContent[peekLayer.position.row].split('')
          addBackChar.splice(peekLayer.position.column -1,0,peekLayer[undoStack.length -2])

          documentContent[peekLayer.position.row] = addBackChar.join('')

          console.log ('new docContent:')
          console.log(documentContent)
          undoStack.length !== 0 && redoStack.push(undoStack.pop())
    
        } else if (stackLayer[top].event === 'insertDelete') {
          // TODO: ditto (but maybe slightly opposite?) to 'undo' insertDelete
          console.log(`Event is: ${stackLayer[stackLayer.length-1].event}`)
        }
      }
      
      undoStack.length !== 0 && redoStack.push(undoStack.pop())
      
    }

    stackOps(topLayer)
    
    // undoStack.length !== 0 && redoStack.push(undoStack.pop())
    

    let updateCursor = true
    let updateDocument = true

    const nextState = {}
    if (updateDocument) {
      // console.log ('editUndo - updateDocument is true here')
      nextState.documentContent = documentContent
      nextState.undoStack = undoStack
      nextState.redoStack = redoStack
    }

    if (updateCursor) {
      //console.log ('editUndo - updateCursor is true here')
      nextState.documentCursor = documentCursor
    }

    // console.log('editUndo -nextState:')
    //console.log(nextState)
    this.setState(nextState)
    
            
  }

  editRedo (menuItem) {

    console.log('editRedo called here')    
    const documentCursor = {...this.state.documentCursor}
    // console.log(menuItem)
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice() 
    const redoStack = this.state.redoStack.slice()   
    // console.log ('New editRedo logs here:')

    const topLayer = redoStack.slice(redoStack.length - 1)
    function stackOps (stackLayer) {
      /**
      * @param {Array} stackLayer - stack of layer to perform ops on
      */
      const top = stackLayer.length - 1

      if (redoStack.length) {
        console.log("Redo - stackOps:")        
        if(stackLayer[top].event === 'insertCharacter') {
          console.log(`stack value: ${JSON.stringify(stackLayer[top])}`)
          const test = documentContent[stackLayer[top].position.row].split('')

          console.log('Redo test: ')
          console.log(test[stackLayer[top].position.column -1])
          console.log(test)

        } else if (stackLayer[top].event === 'insertBackspace') {
          /*
          TODO: implement this here to 'undo' insertBackspace
          $r.state.documentContent
          ["abc", "", "", "", "", "", "", "", "", "", "", "", ""]
          const nextState = {}
          undefined
          const test = $r.state.documentContent[0].split('')
          undefined
          test.push('z')
          4
          test
          ["a", "b", "c", "z"]
          $r.state.documentContent[0] = test.join('')
          "abcz"
          $r.state.documentContent
          ["abcz", "", "", "", "", "", "", "", "", "", "", "", ""]
          nextState.documentContent = $r.state.documentContent
          ["abcz", "", "", "", "", "", "", "", "", "", "", "", ""]
          $r.setState(nextState) // updates documentContent correctly
          */ 
          console.log(`REDO - inside insertBackspace if block: 
            ${JSON.stringify(stackLayer[top])}`)
          console.log(redoStack[redoStack.length - 2])
          console.log(JSON.stringify(documentContent))
          console.log(JSON.stringify(documentCursor))
        } else if (stackLayer[top].event === 'insertDelete') {
          // TODO: ditto (but maybe slightly opposite?) to 'undo' insertDelete
          console.log(`Event is: ${stackLayer[stackLayer.length-1].event}`)
        }
      }

    }
    stackOps(topLayer)

    redoStack.length !== 0 && undoStack.push(redoStack.pop())
    
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

  componentDidMount () {
    this.topLevel.focus()
  }

  moveToStartOfLine (documentCursor, documentContent) {
    documentCursor.column = 0
    console.log(`moveToStartOfLine called,
      documentCursor: ${documentCursor}
      documentContent: ${documentContent}`)
  }

  moveToEndOfLine (documentCursor, documentContent) {
    if (documentContent[documentCursor.row].length) {
      documentCursor.column = documentContent[documentCursor.row].length
    } else {
      documentCursor.column = 0
    }
    console.log(`moveToEndOfLine called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
  }

  moveToTopOfDocument (documentCursor, documentContent) {
    documentCursor.row = 0
    documentCursor.column = 0
    console.log(`moveToTopOfDocument called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
  }

  moveToBottomOfDocument (documentCursor, documentContent) {
    documentCursor.row = documentContent.length - 1
    documentCursor.column = 0
    console.log(`moveToBottomOfDocument called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
  }

  moveUp (documentCursor, documentContent) {
    documentCursor.row -= 1
    if (documentCursor.row < 0) {
      documentCursor.row = 0
    }
    if (documentCursor.column > documentContent[documentCursor.row].length - 1) {
      this.moveToEndOfLine(documentCursor, documentContent)
    }
    console.log(`moveUp called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
  }

  moveDown (documentCursor, documentContent) {
    documentCursor.row += 1
    if (documentCursor.row > documentContent.length - 1) {
      documentCursor.row = documentContent.length - 1
    }
    if (documentCursor.column > documentContent[documentCursor.row].length -1) {
      this.moveToEndOfLine(documentCursor, documentContent)
    }
    console.log(`moveDown called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
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
    console.log(`moveLeft called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
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
    console.log(`moveRight called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
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

    console.log(`insertCarriageReturn called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
  }

  insertBackspace (documentCursor, documentContent) {
    // TODO: implement a track pattern inside here to push to undoStack    
    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    const rowContent = documentContent[documentCursor.row]

    if (documentCursor.column > 0) {
      documentCursor.column -= 1

      const pre = rowContent.slice(0, documentCursor.column)
      const post = rowContent.slice(documentCursor.column + 1)
      changeRow(`${pre}${post}`)
    } else {
      if (documentCursor.row === 0 && documentCursor.column === 0) {
        this.beep()
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


    // console.log(`insertBackspace called, 
    //   documentCursor: ${JSON.stringify(documentCursor)}, 
    //   documentContent: ${JSON.stringify(documentContent)}`)
  }

  insertDelete (documentCursor, documentContent) {
    // TODO: implement a track pattern inside here to push to undoStack
    const rowContent = documentContent[documentCursor.row]

    const changeRow = changes => { documentContent[documentCursor.row] = changes }

    const pre = rowContent.slice(0, documentCursor.column)
    const post = rowContent.slice(documentCursor.column + 1)

    if (post.length) {
      changeRow(`${pre}${post}`)
    } else if (documentCursor.row < documentCursor.length - 1) {
      const nextRowContent = documentContent[documentCursor.row + 1]

      changeRow(`${rowContent}${nextRowContent}`)
      documentContent.splice(documentCursor.row + 1, 1)
    }

    console.log(`insertDelete called, 
      documentCursor: ${documentCursor}, 
      documentContent: ${documentContent}`)
  }

  insertCharacter (character, documentCursor, documentContent) {
    // TODO: implement a track pattern inside here to push to undoStack
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

    // console.log(`insertCharacter called, 
    //   documentCursor: ${documentCursor}, 
    //   documentContent: ${documentContent}`)
  }
  onKeyDown (event) {
    // console.log(`keyCode inside onKeyDown: ${event.keyCode}`)

    const documentCursor = {...this.state.documentCursor}
    const documentContent = this.state.documentContent.slice()
    const undoStack = this.state.undoStack.slice()

    let updateCursor = false
    let updateDocument = false

    // implementation of cursor movement with arrow keys and 
    // alphanumeric character key down events

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
    const nextStackItemIndex = undoStack.length

    if (isKey(KEY.BACKSPACE)) {
      event.preventDefault()
      this.insertBackspace(documentCursor, documentContent)
      // bs-k: undoStack character pattern for 'backspace' key
      nextStackItem[nextStackItemIndex] = 'bs-K'
      nextStackItem.position = documentCursor            
      nextStackItem.event = 'insertBackspace'           
      undoStack.push(nextStackItem)
      updateCursor = true
      updateDocument = true
    } else if (isKey(KEY.DELETE)) {
      event.preventDefault()
      this.insertDelete(documentCursor, documentContent)
      updateCursor = true
      updateDocument = true
      // del-k: undoStack character pattern for 'delete' key
      nextStackItem[nextStackItemIndex] = 'del-K'
      nextStackItem.position = documentCursor    
      nextStackItem.event = 'insertDelete'                   
      undoStack.push(nextStackItem)
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
      // console.log ('updateDocument is true here')
      nextState.documentContent = documentContent
      nextState.undoStack = undoStack
    }

    if (updateCursor) {
      // console.log ('updateCursor is true here')
      nextState.documentCursor = documentCursor
    }

    this.setState(nextState)
  }

  onKeyPress (event) {
    // console.log(`charCode inside onKeyPress: ${event.charCode}`)
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
      documentCursor.column += 1
      const nextStackItemIndex = undoStack.length
      const nextStackItem = {}
      nextStackItem[nextStackItemIndex] = character
      nextStackItem.position = documentCursor 
      nextStackItem.event = 'insertCharacter'           
      undoStack.push(nextStackItem)
    }

    if (updateDocument) {
      this.setState({documentContent,documentCursor, undoStack})
    }
  }

  render () {
    return (
      <div 
        className="top-level-window"
        tabIndex={0}
        onKeyDown={this.onKeyDown}
        onKeyPress={this.onKeyPress}
        ref={(element) => {this.topLevel = element}}
        >
        <div className='app__header'>React Notepad - Untitled.txt</div>
        <div className='app__main-container'>
          <div className='app__menu-bar-container'>
            <MainMenu 
              menu={this.state.mainMenuData} 
              onClick={this.onMainMenuClick}
            />
          </div>
          <div className="app__document-container">
            <NotePad
              cursor={this.state.documentCursor}
              content={this.state.documentContent}
              {...this.props}
            />
            <div className="dev__stack-view-container">
              <UndoStackView
                undoStackObject={this.state.undoStack}
              />
              <RedoStackView
                redoStackObject={this.state.redoStack}
              />
            </div>
          </div>
          <div className="app__status-container">
            <StatusBar />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
