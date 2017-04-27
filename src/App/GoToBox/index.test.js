import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import GoToBox from '.';


describe('GoToBox Component', () => {
  const props = {
    handlers: {
      onSubmit: sinon.spy()
    },
    goToRowNumber: 0
  }
  it('renders with props passed to it', function () {
    expect(shallow(<GoToBox {...props}/>).find('.goToBox').length).to.equal(1)
  })
})