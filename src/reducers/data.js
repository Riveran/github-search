import { GET_DATA, GET_SEARCH_PATH } from './../constants/index'

const initialState = {
  data: '',
  searchPath: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_PATH:
      return { ...state, data: action.json }

    default:
      return state
  }
}
