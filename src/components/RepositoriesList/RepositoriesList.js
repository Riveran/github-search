import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Star from './../../img/star.svg'
import './repositories-list.css'

export class RepositoriesList extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    update: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    forks: PropTypes.number.isRequired,
    owner: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  }

  static defaultProps = {
    name: '',
    url: '',
    created: '',
    update: '',
    stars: 0,
    forks: 0,
    owner: {},
    language: '' || null
  }

  render () {
    const {
      name,
      url,
      created,
      update,
      stars,
      forks,
      owner,
      language
    } = this.props
    const userUrl = owner.url.replace('api.', '').replace('/users', '')
    return (
      <div className='repositories-wrapper'>
        <div className='repositories_owner'>
          <img
            src={owner.avatar_url}
            alt={owner.login}
            width='80px'
            height='80px'
          />
          <a href={userUrl}>
            <span>{owner.login}</span>
          </a>
        </div>
        <div className='repositories_title'>
          <a className='repositories_url' href={url}>
            <p>{name}</p>
          </a>
          <p className='repositories_lang'>
            <li>{language || 'text'}</li>
          </p>
          <div className='repositories_date'>
            <p>last update: {moment(update).format('MMM Do YYYY')}</p>
            <p>created: {moment(created).format('MMM Do YYYY')}</p>
          </div>
        </div>
        <div className='repositories_count'>
          <div className='repositories-star_fork'>
            <img
              className='star'
              width='20px'
              height='20px'
              src={Star}
              alt='star'
            />
            <span className='repositories_mr'> {stars}</span>
          </div>
          <div className='repositories-star_fork'>
            <svg
              aria-label='fork'
              viewBox='0 0 10 16'
              version='1.1'
              width='20'
              height='20'
              role='img'
            >
              <path
                fillRule='evenodd'
                d='M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z'
              />
            </svg>
            <span className='repositories_mr'>{forks}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default RepositoriesList
