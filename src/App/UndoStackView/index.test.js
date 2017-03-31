import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import UndoStackView from '.';

describe('UndoStackView Component', () => {
  it('gets mounted to the dom', function () {
    expect(shallow(<UndoStackView undoStackObject={[]}/>).find('.undoStackView').length).to.equal(1)
  })
})