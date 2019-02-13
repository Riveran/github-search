import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './category.css'

export class Category extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  state = {
    category: 'repositories',
    stars: 0,
    forks: 0
  }

  setCategory = e => {
    e.preventDefault()
    const { searchPath, page, stars, forks, language, sortBy } = this.props.data
    this.setState(
      {
        category: e.currentTarget.dataset.category
      },

      () => {
        const { category } = this.state
        this.props.connectApi(
          searchPath,
          page,
          language,
          stars,
          forks,
          category,
          sortBy
        )
      }
    )
  }

  setLanguageList = () => {
    const {
      statistic,
      searchPath,
      page,
      stars,
      forks,
      language,
      sortBy
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
                this.props.connectApi(
                  searchPath,
                  page,
                  el,
                  stars,
                  forks,
                  sortBy
                )
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
      [id]: e.currentTarget.value.replace(/[^\d,]/g, '')
    })
  }

  handleClick = e => {
    e.preventDefault()
    const { searchPath, page, language, sortBy } = this.props.data
    const { stars, forks } = this.state
    this.props.connectApi(searchPath, page, language, stars, forks, sortBy)
  }

  render () {
    return (
      <React.Fragment>
        <div className='category-wrapper'>
          <ul className='nav-category'>
            {/* <span className='nav_title'><h3>Category</h3></span> */}
            <li className='nav_item'>
              <button
                data-category='repositories'
                className={
                  this.state.category === 'repositories'
                    ? 'nav_btn-active'
                    : 'nav_btn'
                }
                onClick={this.setCategory}
                disabled={!this.props.data.preLoadingSearch}
              >
                <span className='nav_text'>
                  Repositories {this.props.data.repData.total_count}
                </span>
              </button>
            </li>
            <li className='nav_item'>
              <button
                data-category='users'
                className={
                  this.state.category === 'users' ? 'nav_btn-active' : 'nav_btn'
                }
                onClick={this.setCategory}
                disabled={!this.props.data.preLoadingSearch}
              >
                <span className='nav_text'>
                  Users {this.props.data.usersData.total_count}
                </span>
              </button>
            </li>
          </ul>
          {this.state.category === 'users' ? null : (
            <div className='filtres-wrapper'>
              <form className='set_language'>
                <hr className='fl' />
                {this.setLanguageList()}
                <hr className='fl' />
                {this.props.data.preLoadingSearch ? (
                  <div className='set_stars-forks'>
                    <span className='set_st'>Stars:</span>
                    <input
                      id='stars'
                      className='set_filters'
                      type='text'
                      placeholder='more than'
                      onChange={this.handleChange}
                    />
                    <span className='set_fr'>Forks:</span>

                    <input
                      id='forks'
                      className='set_filters'
                      type='text'
                      placeholder='more than'
                      onChange={this.handleChange}
                    />
                    <button
                      className='set_btn'
                      onClick={this.handleClick}
                      disabled={!(this.state.forks || this.state.stars)}
                    >
                      {' '}
                      submit{' '}
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default Category
