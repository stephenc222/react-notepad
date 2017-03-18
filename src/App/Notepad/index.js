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
          <div className="notepadArea__line-number">{1 + row}</div>
          {content}
        </div>
      )
    } else {
      return (
        <div key={row} className="notepadArea__row">
          <div className="notepadArea__line-number">{1 + row}</div>
          {content}
        </div>
      )
    }
  }

  // contentColumn is each individual character in each row
  renderContentColumn (contentColumn, column, row) {
    // console.log ( `
    //   renderContentColumn args: 
    //     contentColumn:${contentColumn} 
    //     column: ${column}
    //     row: ${row}`)
    const { cursor } = this.props

    let glyph = contentColumn
    if (contentColumn === ' ') {
      glyph = String.fromCharCode(0xA0)
    }

    if (cursor.row === row && cursor.column === column) {
      return (
        <div 
          key={column} className="notepadArea__column notepadArea__cursor"
          onMouseDown={() => this.props.onMouseDown()}
          onMouseEnter={(event) => this.props.onMouseEnter(event)}
          onMouseLeave={(event) => this.props.onMouseLeave(event)}
          onMouseUp={() => this.props.onMouseUp()}>
          {glyph}
        </div>
      )
    } else {
      return (
        <div 
          key={column} className="notepadArea__column"
          onMouseDown={() => this.props.onMouseDown()}
          onMouseEnter={(event) => this.props.onMouseEnter(event)}
          onMouseLeave={(event) => this.props.onMouseLeave(event)}
          onMouseUp={() => this.props.onMouseUp()}>
          {glyph}
        </div>
      )
    }

  }
  render () {
    const {content} = this.props

    return (
      <div className="notepadArea"
        onMouseUp={() => this.props.onMouseUp()}>
          {content.map(this.renderContentRow)}
      </div>
    )
  }
}

export default Notepad