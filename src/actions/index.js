import {
  GET_SEARCH_PATH,
  GET_DATA,
  SET_CATEGORY,
  ERROR_FETCH,
  SET_PATH,
  SET_PAGE,
  GET_FULL_RESULT,
  SET_LOADING,
  SET_LOADING_SEARCH,
  SET_LANGUAGE,
  SET_STARS,
  SET_FORKS,
  SET_SORT
} from './../constants/index'
import axios from 'axios'

/* да, тут жесть, прошу понять и простить */

export function getFullResult (searchPath) {
  const number = 1
  const preLoadingSearch = false
  return async dispatch => {
    dispatch(saveSearchPath(searchPath))
    dispatch({
      type: SET_LOADING_SEARCH,
      payload: preLoadingSearch
    })
    const resultStat = await axios.get(
      `https://api.github.com/search/repositories?q=${searchPath}&per_page=100`
    )
    dispatch({
      type: GET_FULL_RESULT,
      payload: resultStat.data
    })
    dispatch(connectApi(searchPath, number))
    dispatch({
      type: SET_LOADING_SEARCH,
      payload: !preLoadingSearch
    })
  }
}

export function connectApi (
  searchPath,
  page,
  language,
  stars,
  forks,
  category,
  sortBy
) {
  const loading = true
  let categoryS = category || 'repositories'
  return async dispatch => {
    dispatch({
      type: SET_PAGE,
      page
    })

    dispatch({
      type: SET_LANGUAGE,
      payload: language
    })

    dispatch({
      type: SET_STARS,
      stars
    })

    dispatch({
      type: SET_FORKS,
      forks
    })

    dispatch({
      type: SET_SORT,
      payload: sortBy
    })

    try {
      dispatch({
        type: SET_LOADING,
        payload: loading
      })

      const responseRepos = await axios.get(
        categoryS === 'repositories' || false
          ? `https://api.github.com/search/repositories?q=${searchPath}+${
            language ? 'language:' + language + '+' : ''
          }${stars ? 'stars:>' + stars + '+' : ''}
      ${
  forks ? 'forks:>' + forks + '+' : ''
}&per_page=5&page=${page}&sort=${sortBy}`
          : `https://api.github.com/search/users?q=${searchPath}&per_page=20&page=${page}`
      )
      if (categoryS === 'repositories' || false) {
        dispatch(receiveRepos(responseRepos.data))
      } else {
        console.log(
          `https://api.github.com/search/users?q=${searchPath}&per_page=20&page=${page}`
        )
        dispatch(receiveUsers(responseRepos.data))
      }

      dispatch(setCategory(categoryS))

      dispatch({
        type: SET_LOADING,
        payload: !loading
      })
    } catch {
      dispatch({
        type: ERROR_FETCH,
        payload: 'Ошибка при загрузке данных'
      })
    }
  }
}

export function setCategory (category) {
  return {
    type: SET_CATEGORY,
    category
  }
}

function saveSearchPath (searchPath) {
  return {
    type: SET_PATH,
    searchPath
  }
}

function receiveRepos (repos) {
  return {
    type: GET_DATA,
    repos
  }
}

function receiveUsers (json) {
  return {
    type: GET_SEARCH_PATH,
    json
  }
}

/* const responseUsers = await axios.get(
        `${BASE_PATH}${SEARCH_PATH}/users?q=${searchPath}&per_page=5`
      )
      dispatch(receiveUsers(responseUsers.data)) */
