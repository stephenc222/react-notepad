import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import OpenFileBox from '.';

describe('OpenFileBox Component', () => {
  const props = {
    userGists: [],
    openFileName: '',
    openFileOptions: [],
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