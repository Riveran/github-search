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
  SET_LANGUAGE
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

export function connectApi (searchPath, page, language) {
  console.log('action', language)
  const loading = true
  return async dispatch => {
    dispatch({
      type: SET_PAGE,
      page
    })
    dispatch({
      type: SET_LANGUAGE,
      payload: language
    })
    try {
      dispatch({
        type: SET_LOADING,
        payload: loading
      })
      const responseRepos = await axios.get(
        `https://api.github.com/search/repositories?q=${searchPath}+language:${language}&per_page=5&page=${page}`
      )
      dispatch(receiveRepos(responseRepos.data))

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
