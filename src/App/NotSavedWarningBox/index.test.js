import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import NotSavedWarningBox from '.';


describe('NotSavedWarningBox Component', () => {
  const props = {
    onClickSaveYes: sinon.spy(),
    onClickSaveNo: sinon.spy(),
    onClickSaveCancel: sinon.spy(),
  }
  it('renders with props passed to it', function () {
    expect(shallow(<NotSavedWarningBox {...props}/>).find('.notSavedWarningBox').length).to.equal(1)
  })
})