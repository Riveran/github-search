import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './category.css'

export class Category extends Component {
  static propTypes = {}

  render () {
    return (
      <div className='category-wrapper'>
        <ul>
          <li>Repositories</li>
          <li>Users</li>
          <li>Wikis</li>
        </ul>
      </div>
    )
  }
}

export default Category
