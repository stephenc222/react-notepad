import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import './index.css'

function Launcher () {
  return (
    <Router>
      <Route path='*' component={App} />
    </Router>
  )
}

ReactDOM.render(
  <Launcher />,
  document.getElementById('root')
)
