import React, { Component } from 'react'
import './input.css'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export class Input extends Component {
  static propTypes = {
    getFullResult: PropTypes.func.isRequired
  }

  state = {
    searchPath: '',
    error: false,
    newClas: ''
  }

  handleError = () => {
    this.setState({
      error: true
    })
  }

  handleChange = ({ currentTarget }) => {
    const reg = /[№;%:?*()=!@ а-яА-ЯёЁ_-]/g
    const value =
      currentTarget.value.search(reg) != -1
        ? ((currentTarget.value = currentTarget.value.replace(reg, '')),
        this.handleError())
        : currentTarget.value
    if (value) {
      this.setState({
        error: false
      })
    }
    this.setState({
      searchPath: value
    })
  }

  handleClick = e => {
    e.preventDefault()
    const { searchPath } = this.state
    this.props.getFullResult(searchPath)
  }

  render () {
    console.log(this.props.data.loading)
    return (
      <form className='input-wrapper'>
        <div>
          <input
            className='input-search'
            placeholder='search repository or users'
            onChange={this.handleChange}
          />

          <button
            className='input-btn'
            onClick={this.handleClick}
            disabled={!this.state.searchPath}
          >
            Search
          </button>
        </div>
        <TransitionGroup>
          {this.state.error ? (
            <CSSTransition classNames='option'>
              <span className='input-error'>sorry, only latin symbol</span>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </form>
    )
  }
}

export default Input
