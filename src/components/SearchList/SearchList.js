import React, { Component } from 'react'
import ItemsList from './../ItemsList/ItemsList'
import PropTypes from 'prop-types'
import './search-list.css'

export class SearchList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  body = () => {
    if (!this.props.data.data) {
      return <div className='welcome'>hello, whom are you search</div>
    }
    const renderItems = this.props.data.data.items.map(
      ({ avatar_url, login, html_url, id }) => {
        return (
          <ItemsList
            key={id}
            avatar={avatar_url}
            login={login}
            url={html_url}
          />
        )
      }
    )
    return renderItems
  }

  render () {
    return (
      <div className='search-list-wrapper'>
        {this.props.data.data ? (
          <p>Total: {this.props.data.data.total_count}</p>
        ) : null}
        {this.body()}
      </div>
    )
  }
}

export default SearchList
