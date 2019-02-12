import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './sort-filters.css'

export default class SortFilters extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    connectApi: PropTypes.func.isRequired
  }

  static defaultProps = {
    data: {},
    connectApi: () => {}
  }

  body = () => {
    const {
      searchPath,
      page,
      stars,
      forks,
      language,
      renderCategory,
      sortBy
    } = this.props.data
    if (this.props.data.renderCategory === 'users') return null
    return (
      <div className='sort-wrapper'>
        sort by:
        <span
          className='sort_items'
          onClick={() => {
            this.props.connectApi(
              searchPath,
              page,
              stars,
              forks,
              language,
              renderCategory,
              ''
            )
          }}
        >
          Name
        </span>
        <span
          className='sort_items'
          onClick={() => {
            this.props.connectApi(
              searchPath,
              page,
              stars,
              forks,
              language,
              renderCategory,
              'stars'
            )
          }}
        >
          Stars
        </span>
        <span
          className='sort_items'
          onClick={() => {
            this.props.connectApi(
              searchPath,
              page,
              stars,
              forks,
              language,
              renderCategory,
              'forks'
            )
          }}
        >
          Forks
        </span>
        <span
          className='sort_items'
          onClick={() => {
            this.props.connectApi(
              searchPath,
              page,
              stars,
              forks,
              language,
              renderCategory,
              'updated'
            )
          }}
        >
          Updated
        </span>
      </div>
    )
  }

  render () {
    return <React.Fragment>{this.body()}</React.Fragment>
  }
}
