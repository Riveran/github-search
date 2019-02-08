import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './category.css'

export class Category extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  setCategory = e => {
    e.preventDefault()
    const category = e.currentTarget.dataset.category
    this.props.setCategory(category)
  }

  render () {
    return (
      <React.Fragment>
        <div className='category-wrapper'>
          <ul className='nav-category'>
            Category
            <li className='nav_item'>
              <button
                data-category='repositories'
                className='btn'
                onClick={this.setCategory}
              >
                Repositories {this.props.data.repData.total_count}
              </button>
            </li>
            <li className='nav_item'>
              <button
                data-category='users'
                className='btn'
                onClick={this.setCategory}
              >
                Users {this.props.data.usersData.total_count}
              </button>
            </li>
          </ul>
          <div className='filtres-wrapper'>
            <form className='set_language'>
              <input type='radio' name='language' />
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Category
