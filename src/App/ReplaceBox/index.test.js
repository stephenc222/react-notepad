import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import ReplaceBox from '.';


describe('ReplaceBox Component', () => {
  const props = {
    handlers: {
      onChange: sinon.spy(),
      onCheckBoxChange: sinon.spy(),
      onReplaceInputChange: sinon.spy(),
      onCancel: sinon.spy(),
      onSubmit: sinon.spy()
    },
    findInFile: 'find',
    replaceInFile: 'replace with'
  }
  it('renders with props passed to it', function () {
    const onClickStub = sinon.spy()
    expect(shallow(<ReplaceBox {...props}/>)
    .find('.replaceBox').length).to.equal(1)
  })
})