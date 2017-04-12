import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './index.css'

class PageExitManager extends Component {
  constructor (props) {
    super(props)

    this.enable = this.enable.bind(this)
    this.disable = this.disable.bind(this)
    this.onNo = this.onNo.bind(this)
    this.onYes = this.onYes.bind(this)
  }

  componentWillMount () {
    if (this.props.isDirty || this.props.prompt) {
      this.enable(this.props.message)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isDirty) {
      if ((!this.props.prompt && !this.props.isDirty) || this.props.message !== nextProps.message) {
        this.enable(nextProps.message)
      }
    } else {
      this.disable()
    }
  }

  componentWillUnmount () {
    this.disable()
  }

  enable (message) {
    if (this.unblock) {
      this.unblock()
    }

    this.unblock = this.context.router.history.block(message)
  }

  disable () {
    if (this.unblock) {
      this.unblock()
      this.unblock = null
    }
  }

  onNo () {
    this.props.onNo()
  }

  onYes () {
    this.props.onYes()
  }

  render () {
    return (
      <div className='PageExitManager-Container'>
        {
          this.props.prompt && this.props.isDirty && (
            <div className='PageExitManager__Prompt-Backdrop'>
              <div className='PageExitManager__Prompt-Container'>
                <div className='PageExitManager__Prompt-Message-Text'>
                  {this.props.message}
                </div>
                <div className='PageExitManager__Prompt-Buttons-Container'>
                  <div
                    className='PageExitManager__Prompt-Button'
                    onClick={this.onNo}>No</div>
                  <div
                    className='PageExitManager__Prompt-Button'
                    onClick={this.onYes}>Yes</div>
                </div>
              </div>
            </div>
          )
        }
        {this.props.children}
      </div>
    )
  }
}

PageExitManager.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      block: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
}

PageExitManager.defaultProps = {
  message: 'You have unsaved information, are you sure you want to leave this page?',
  isDirty: false
}

PageExitManager.propTypes = {
  prompt: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  isDirty: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired
}

export default PageExitManager
