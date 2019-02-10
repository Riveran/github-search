import Category from './../components/Category/Category'
import { setCategory, connectApi } from '../actions/index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  setCategory: category => dispatch(setCategory(category)),
  connectApi: (searchPath, page, language, stars, forks) =>
    dispatch(connectApi(searchPath, page, language, stars, forks))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
