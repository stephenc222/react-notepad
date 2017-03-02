import React, { Component } from 'react'
import './App.css'
import MainMenu from './MainMenu'
import NotePad from './Notepad'

class App extends Component {
  constructor () {
    super()
    // menu items here 
    const fileItem = {
        label: 'File',
        action: () => {
          console.log (
            `File menu sub-items: New, Open, Save, Save As..., 
            Page Setup, Print..., Exit`)
        }
      }       
    const editItem = {
        label: 'Edit',
        action: () => {
          console.log(
            `Edit menu sub-items: Undo, Cut, Copy, Paste, Delete, Find, Find Next,Replace... 
            Go To..., Select All, Time/Date`)
        }
      }      
    const formatItem ={
        label: 'Format',
        action: () => {
          console.log(`Format menu sub-items: Word Wrap, Font`)
        }
      }
    const viewItem = {
        label: 'View',
        action: () => {
          console.log(`View menu sub-item: Status Bar`)
        }
      }
    const helpItem = {
        label: 'Help',
        action: () => {
          console.log(`Help menu sub-items: View Help, About Notepad`)
        }
      }
    this.state = {
      items: [fileItem,editItem,formatItem,viewItem,helpItem]
    }
  }
  render () {
    return (
      <div className="App">
        <MainMenu items={this.state.items}/>
        <NotePad />
      </div>
    )
  }
}

export default App;
