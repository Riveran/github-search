import {
  GET_DATA,
  GET_SEARCH_PATH,
  SET_CATEGORY,
  ERROR_FETCH,
  SET_PATH,
  SET_PAGE,
  GET_FULL_RESULT,
  SET_LOADING,
  SET_LOADING_SEARCH,
  SET_LANGUAGE,
  SET_STARS,
  SET_FORKS
} from './../constants/index'

const initialState = {
  usersData: '',
  repData: '',
  renderCategory: 'repositories',
  errorMsg: '',
  page: 1,
  searchPath: '',
  statistic: '',
  language: '',
  stars: 0,
  forks: 0,
  loading: false,
  preLoadingSearch: false
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
      return { ...state, page: action.page }

    case GET_FULL_RESULT:
      return { ...state, statistic: action.payload }

    case SET_LOADING:
      return { ...state, loading: action.payload }

    case SET_LOADING_SEARCH:
      return { ...state, preLoadingSearch: action.payload }

    case SET_LANGUAGE:
      return { ...state, language: action.payload }

    case SET_STARS:
      return { ...state, stars: action.stars }

    case SET_FORKS:
      return { ...state, forks: action.forks }

    default:
      return state
  }
}
