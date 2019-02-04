import axios from 'axios'
import { GET_SEARCH_PATH, GET_DATA } from './../constants/index'

const BASE_PATH = 'https://api.github.com'
const SEARCH_PATH = '/search'
const SEARCH_USERS = '/users'

export function connectApi (searchPath) {
  return dispatch => {
    return fetch(`${BASE_PATH}${SEARCH_PATH}${SEARCH_USERS}?q=${searchPath}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function receivePosts (json) {
  return {
    type: GET_SEARCH_PATH,
    json
  }
}

/* const res = await axios.get(`${BASE_PATH}${SEARCH_PATH}${SEARCH_USERS}?q=${searchPath}`) json.items.login */
