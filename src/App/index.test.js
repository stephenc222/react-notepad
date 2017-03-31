import React from 'react'
//import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import App from '.'

describe('App Component', () => {
  it('gets mounted to the dom', () => {
    //const div = document.createElement('div')
    //ReactDOM.render(<App />, div)
    expect(mount(<App/>).find('.top-level-window').length).to.equal(1)
  })
})
  
