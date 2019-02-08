import Category from './../components/Category/Category'
import { setCategory } from '../actions/index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  setCategory: category => dispatch(setCategory(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
