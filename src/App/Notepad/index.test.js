import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Notepad from '.';

// TODO: these are all the props that Notepad (rename this Component?) needs
// cursor={this.state.documentCursor}
// content={this.state.documentContent}
// selection={this.state.documentSelection}
// isSelected={this.isSelected}
// onMouseDown={this.onNotepadMouseDown}
// onMouseEnter={this.onNotepadMouseEnter}
// onMouseLeave={this.onNotepadMouseLeave}
// onMouseUp={this.onNotepadMouseUp}

describe('Notepad Component', () => {
  const props = {
    content: [],
    onMouseLeave: sinon.spy(),
    onMouseDown: sinon.spy(),
    onMouseEnter: sinon.spy(),
    onMouseUp: sinon.spy(),
    isSelected: sinon.spy()
  }
  it('renders with props passed to it', function () {
    expect(shallow(<Notepad {...props}/>).find('.notepadArea').length).to.equal(1)
  })
})