import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import SaveAsBox from '.';


describe('SaveAsBox Component', () => {
  const props = {
    saveAsHandleChange: sinon.spy(),
    handleCancel: sinon.spy(),
    saveAsHandleSubmit: sinon.spy(),
    saveAsFormFileName: '',
    saveAsFormFileDescription: ''
  }
  it('renders with props passed to it', function () {
    expect(shallow(<SaveAsBox {...props}/>)
    .find('.saveAsBox').length).to.equal(1)
  })
})