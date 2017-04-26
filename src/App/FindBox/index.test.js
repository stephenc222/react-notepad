import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import FindBox from '.';


describe('FindBox Component', () => {
  const props = {
    handlers: {
      onChange: sinon.spy(),
      onCheckBoxChange: sinon.spy(),
      onSubmit: sinon.spy(),
      onCancel: sinon.spy()
    },
    findInFile: 'found!',
    matchCase: false,
  }
  it('renders with props passed to it', function () {
    expect(shallow(<FindBox {...props}/>).find('.findBox').length).to.equal(1)
  })
})