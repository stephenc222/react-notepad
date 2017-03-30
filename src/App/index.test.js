import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';
//import { shallow } from 'enzyme'

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })
})
  
