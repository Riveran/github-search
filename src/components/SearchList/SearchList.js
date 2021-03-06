import React, { Component } from 'react'
import ItemsList from './../ItemsList/ItemsList'
import RepositoriesList from './../RepositoriesList/RepositoriesList'
import PropTypes from 'prop-types'
import './search-list.css'
import Paginations from './../Paginations/Paginations'
import SortFilters from './../SortFilters/SortFilters'

export class SearchList extends Component {
  static propTypes = {
    usersData: PropTypes.array.isRequired,
    repData: PropTypes.array.isRequired,
    renderCategory: PropTypes.string.isRequired,
    errorMsg: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    forks: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired
  }

  static defaultProps = {
    usersData: [],
    repData: [],
    renderCategory: 'repositories',
    errorMsg: '',
    stars: 0,
    forks: 0,
    language: ''
  }

  state = {
    rateLimit: false
  }

  componentDidMount = () => {
    setInterval(() => {
      const { errorMsg } = this.props.data
      if (errorMsg) {
        this.setState({
          rateLimit: true
        })
      }
    }, 5000)
  }
  /* asdasd */
  body = () => {
    const {
      usersData,
      repData,
      renderCategory,
      errorMsg,
      searchPath
    } = this.props.data

    if (errorMsg) {
      return <div className='welcome_error'>{errorMsg}</div>
    }

    switch (renderCategory) {
      case 'repositories':
        if (repData.items.length === 0) {
          return (
            <div className='welcome'>
              <h2>sorry, repositories {searchPath} not found </h2>
            </div>
          )
        }
        const renderRepositories = repData.items.map(
          ({
            name,
            id,
            html_url,
            description,
            created_at,
            updated_at,
            stargazers_count,
            forks_count,
            owner,
            language
          }) => {
            return (
              <RepositoriesList
                key={id}
                name={name}
                url={html_url}
                description={description}
                created={created_at}
                update={updated_at}
                stars={stargazers_count}
                forks={forks_count}
                owner={owner}
                language={language}
                totalCount={this.props.repData.total_count}
              />
            )
          }
        )
        return renderRepositories

      case 'users':
        if (usersData.items.length === 0) {
          return (
            <div className='welcome'>
              <h2>sorry, user {searchPath} not found </h2>
            </div>
          )
        }
        const renderUsers = usersData.items.map(
          ({ avatar_url, login, html_url, id }) => {
            return (
              <ItemsList
                key={id}
                avatar={avatar_url}
                login={login}
                url={html_url}
                totalCount={this.props.usersData.total_count}
              />
            )
          }
        )
        return renderUsers

      default:
        return <div>hello</div>
    }
  }

  handlePageChange = ({ target }) => {
    const btnType = target.getAttribute('data-name')
    let { page } = this.props.data

    if (!isNaN(btnType)) {
      this.updatePage(+btnType)
    } else {
      switch (btnType) {
        case 'next':
          this.updatePage(page + 1)
          break
        case 'prev':
          this.updatePage(page - 1)
          break
        default:
          return null
      }
    }
  }

  updatePage = page => {
    const {
      searchPath,
      language,
      stars,
      forks,
      renderCategory,
      sortBy
    } = this.props.data
    this.props.connectApi(
      searchPath,
      page,
      language,
      stars,
      forks,
      renderCategory,
      sortBy
    )
  }

  render () {
    const {
      usersData,
      repData,
      loading,
      preLoadingSearch,
      renderCategory
    } = this.props.data
    const lastPage =
      renderCategory === 'repositories'
        ? Math.ceil(repData.total_count / 5) > 200
          ? 200
          : Math.ceil(repData.total_count / 5)
        : Math.ceil(usersData.total_count / 20) > 50
          ? 50
          : Math.ceil(usersData.total_count / 20)
    if (this.state.rateLimit) {
      return (
        <div className='welcome'>
          Извините, вы превысили лимит допустимых запросов
        </div>
      )
    }
    return (
      <div
        className={
          renderCategory === 'repositories'
            ? 'search-list-wrapper'
            : 'search-list-wrapper_users'
        }
      >
        {!usersData && !repData ? (
          <div className='welcome'>
            {!preLoadingSearch ? 'searching...' : 'render...'}
          </div>
        ) : (
          <React.Fragment>
            {!loading ? (
              <React.Fragment>
                <SortFilters
                  data={this.props.data}
                  connectApi={this.props.connectApi}
                />
                {this.body()}
                {(repData.total_count <= 5 &&
                  renderCategory === 'repositories') ||
                (usersData.total_count <= 20 &&
                  renderCategory === 'users') ? null : (
                    <Paginations
                      onClick={this.handlePageChange}
                      page={this.props.data.page}
                      lastPage={lastPage}
                    />
                  )}
              </React.Fragment>
            ) : (
              <div className='welcome'>
                <h2>loading...</h2>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default SearchList
