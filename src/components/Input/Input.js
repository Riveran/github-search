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
      <form className='input-wrapper'>
        <input
          className='input-search'
          placeholder='search repository or users'
          onChange={this.handleChange}
        />

        <button className='input-btn' onClick={this.handleClick}>
          Search
        </button>
      </form>
    )
  }
}

export default Input
