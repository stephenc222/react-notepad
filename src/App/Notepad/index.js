import React, { Component } from 'react'
import './index.css'

class Notepad extends Component {
  constructor (props) {
    super(props)

    this.renderContentRow = this.renderContentRow.bind(this)
    this.renderContentColumn = this.renderContentColumn.bind(this)
  }


  renderContentRow (contentRow, row) {
    const {cursor} = this.props
    //console.log(cursor)
    
    const rowWithEOL = `${contentRow}${String.fromCharCode(0xA0)}`
    // console.log(contentRow)
    //console.log(rowWithEOL)
    // content is the content per row
    let content = rowWithEOL.split('').map((contentColumn, column) => 
      this.renderContentColumn(contentColumn,column,row))
    if (contentRow.length === 0) {
      content = this.renderContentColumn(' ', 0, row)
    }

    if (cursor.row === row) {
      return (
        <div key={row} className="notepadArea__row notepadArea__row--highlight">
          {/*<div className="notepadArea__line-number">{1 + row}</div>*/}
          <div className="notepadArea__line-number">{row}</div>
          {content}
        </div>
      )
    } else {
      return (
        <div key={row} className="notepadArea__row">
          {/*<div className="notepadArea__line-number">{1 + row}</div>*/}
          <div className="notepadArea__line-number">{row}</div>
          {content}
        </div>
      )
    }
  }

  // contentColumn is each individual character in each row
  renderContentColumn (contentColumn, column, row) {
    const { cursor, isSelected } = this.props
    let glyph = contentColumn
    if (contentColumn === ' ') {
      glyph = String.fromCharCode(0xA0)
    }

    if (cursor.row === row && cursor.column === column) {
      return (
        <div 
          key={column} 
          className={
            `notepadArea__column${isSelected(column, row) ? '--selected' : ''} 
            notepadArea__cursor${this.props.showModal ? '-hidden': ''}`}
          onMouseDown={(event) => this.props.onMouseDown(event, column, row)}
          onMouseEnter={(event) => this.props.onMouseEnter(event, column, row)}
          onMouseUp={(event) => this.props.onMouseUp(event)}>
          {glyph}
        </div>
      )
    } else {
      return (
        <div 
          key={column} 
          className={`notepadArea__column${isSelected(column, row) ? '--selected' : ''}`}
          onMouseDown={(event) => this.props.onMouseDown(event, column, row)}
          onMouseEnter={(event) => this.props.onMouseEnter(event, column, row)}
          onMouseUp={(event) => this.props.onMouseUp(event)}>
          {glyph}
        </div>
      )
    }

  }
  render () {
    const {content} = this.props

    return (
      <div className="notepadArea"
        onMouseLeave={() => this.props.onMouseLeave()}
        onClick={(event) => console.log(event.target)}>
          {content.map(this.renderContentRow)}
      </div>
    )
  }
}

export default Notepad