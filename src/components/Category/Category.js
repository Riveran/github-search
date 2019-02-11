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

  state = {
    stars: 0,
    forks: 0
  }

  setLanguageList = () => {
    const {
      statistic,
      searchPath,
      page,
      stars,
      forks,
      language
    } = this.props.data
    if (!this.props.data.preLoadingSearch) return null
    const LanguageList = []
    statistic.items.forEach(el => {
      const language = el.language
      if (LanguageList.includes(language)) {
        return
      }
      LanguageList.push(language)
    })

    const languageListItems = LanguageList.map((el, index) => {
      if (el === null) {
        return null
      } else {
        return (
          <div key={index}>
            <input
              type='radio'
              name='language'
              value={el}
              checked={language === el}
              onClick={() => {
                this.props.connectApi(searchPath, page, el, stars, forks)
              }}
            />
            <span className='filterLanguage--item'>{el}</span>
          </div>
        )
      }
    })

    return languageListItems
  }

  handleChange = e => {
    e.preventDefault()
    const { id } = e.currentTarget
    this.setState({
      [id]: e.currentTarget.value
    })
  }

  handleClick = e => {
    e.preventDefault()
    const { searchPath, page, language } = this.props.data
    const { stars, forks } = this.state
    this.props.connectApi(searchPath, page, language, stars, forks)
  }

  getSort = () => {}

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
              {this.setLanguageList()}
              {this.props.data.preLoadingSearch ? (
                <div className='set_stars-forks'>
                  Stars:
                  <input
                    id='stars'
                    className='set_filters'
                    type='text'
                    placeholder='stars more then'
                    onChange={this.handleChange}
                  />
                  Forks:
                  <input
                    id='forks'
                    className='set_filters'
                    type='text'
                    placeholder='forks more then'
                    onChange={this.handleChange}
                  />
                  <button className='set_btn' onClick={this.handleClick}>
                    {' '}
                    submit{' '}
                  </button>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Category
