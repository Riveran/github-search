import React, { Component } from 'react'
import ItemsList from './../ItemsList/ItemsList'
import RepositoriesList from './../RepositoriesList/RepositoriesList'
import PropTypes from 'prop-types'
import './search-list.css'
import Paginations from './../Paginations/Paginations'

export class SearchList extends Component {
  static propTypes = {
    usersData: PropTypes.array.isRequired,
    repData: PropTypes.array.isRequired,
    renderCategory: PropTypes.string.isRequired,
    errorMsg: PropTypes.string.isRequired
  }

  static defaultProps = {
    usersData: [],
    repData: [],
    renderCategory: 'repositories',
    errorMsg: ''
  }

  body = () => {
    const { usersData, repData, renderCategory, errorMsg } = this.props.data

    if (errorMsg) {
      return <div className='welcome_error'>{errorMsg}</div>
    }

    switch (renderCategory) {
      case 'repositories':
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

  updatePage = number => {
    const { connectApi } = this.props
    connectApi(this.props.data.searchPath, number)
  }

  render () {
    const { usersData, repData } = this.props.data
    const lastPage =
      Math.ceil(this.props.data.repData.total_count / 5) > 200
        ? 200
        : Math.ceil(this.props.data.repData.total_count / 5)
    return (
      <div className='search-list-wrapper'>
        {!usersData && !repData ? (
          <div className='welcome'>hello, whom are you search</div>
        ) : (
          <React.Fragment>
            {this.body()}
            <Paginations
              onClick={this.handlePageChange}
              page={this.props.data.page}
              lastPage={lastPage}
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default SearchList
