import {
  GET_SEARCH_PATH,
  GET_DATA,
  SET_CATEGORY,
  ERROR_FETCH,
  SET_PATH,
  SET_PAGE
} from './../constants/index'
import axios from 'axios'

const BASE_PATH = 'https://api.github.com'
const SEARCH_PATH = '/search'

export function connectApi (searchPath, number) {
  return async dispatch => {
    dispatch(saveSearchPath(searchPath))
    dispatch({
      type: SET_PAGE,
      number
    })
    try {
      const responseRepos = await axios.get(
        `${BASE_PATH}${SEARCH_PATH}/repositories?q=${searchPath}&per_page=5&page=${number}`
      )
      dispatch(receiveRepos(responseRepos.data))

      /* const responseUsers = await axios.get(
        `${BASE_PATH}${SEARCH_PATH}/users?q=${searchPath}&per_page=5`
      )
      dispatch(receiveUsers(responseUsers.data)) */
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
