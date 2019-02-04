import React, { Component } from 'react'
import './input.css'
import PropTypes from 'prop-types'

export class Input extends Component {
  static propTypes = {
    connectApi: PropTypes.func.isRequired
  }

  state = {
    searchPath: ''
  }

  handleChange = e => {
    this.setState({
      searchPath: e.currentTarget.value
    })
  }

  handleClick = e => {
    e.preventDefault()
    const { searchPath } = this.state
    this.props.connectApi(searchPath)
  }

  render () {
    return (
      <div className='input-wrapper'>
        <input className='input-search' onChange={this.handleChange} />
        <button onClick={this.handleClick}>Search</button>
      </div>
    )
  }
}

export default Input
