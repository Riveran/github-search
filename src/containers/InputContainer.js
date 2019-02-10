import Input from '../components/Input/Input'
import { getFullResult } from '../actions/index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  getFullResult: searchPath => dispatch(getFullResult(searchPath))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
