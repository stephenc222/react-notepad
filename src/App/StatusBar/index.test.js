import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import StatusBar from '.';

describe('StatusBar Component', () => {
  const props = {
    cursor: {
      row: 0,
      column: 0
    }
  }
  it('renders with props passed to it', function () {
    expect(shallow(<StatusBar {...props} />).find('.statusBar').length).to.equal(1)
  })
})