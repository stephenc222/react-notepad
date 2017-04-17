import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import OpenFileBox from '.';
import MainMenuData from '../../App/ui-data'

describe('OpenFileBox Component', () => {
  const props = {
    userGists: [],
    onGistClick: sinon.spy(),
    handlers: {
      onCancel: sinon.spy()
    }
  }
  it('renders with props passed to it', function () {
    const onClickStub = sinon.spy()
    expect(shallow(<OpenFileBox {...props}/>)
    .find('.openFileBox').length).to.equal(1)
  })
})