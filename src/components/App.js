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
        object: 'File MenuObject'
      }       
    const editItem = {
        label: 'Edit',
        object: 'Edit MenuObject'
      }      
    const formatItem ={
        label: 'Format',
        object: 'Format MenuObject'
      }
    const viewItem = {
        label: 'View',
        object: 'View MenuObject'
      }
    const helpItem = {
        label: 'Help',
        object: 'Help MenuObject'
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
