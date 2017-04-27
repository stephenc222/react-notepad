import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import Notepad from '.';

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