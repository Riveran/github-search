import {
  GET_DATA,
  GET_SEARCH_PATH,
  SET_CATEGORY,
  ERROR_FETCH,
  SET_PATH,
  SET_PAGE
} from './../constants/index'

const initialState = {
  usersData: '',
  repData: '',
  renderCategory: 'repositories',
  errorMsg: '',
  page: 1,
  searchPath: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_PATH:
      return { ...state, usersData: action.json }

    case GET_DATA:
      return { ...state, repData: action.repos }

    case SET_CATEGORY:
      return { ...state, renderCategory: action.category }

    case ERROR_FETCH:
      return { ...state, errorMsg: action.payload }

    case SET_PATH:
      return { ...state, searchPath: action.searchPath }

    case SET_PAGE:
      return { ...state, page: action.number }

    default:
      return state
  }
}
