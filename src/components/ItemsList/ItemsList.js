import React, { Component } from 'react'
import './Items-list.css'
import axios from 'axios'
import PropTypes from 'prop-types'

export class ItemsList extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  body = async () => {
    const result = await axios.get(
      `https://api.github.com/users/${this.props.login}`
    )
    return console.log(result)
  }

  render () {
    const { login, avatar, url } = this.props
    if (!this.props) return <div>search</div>
    return (
      <div className='item-wrapper'>
        <div className='item-block'>
          <img src={avatar} width={70} height={70} />
          <a href={url}>
            <p>{login}</p>
          </a>
        </div>
      </div>
    )
  }
}

export default ItemsList
