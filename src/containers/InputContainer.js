import Input from '../components/Input/Input'
import { connectApi } from '../actions/index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  connectApi: searchPath => dispatch(connectApi(searchPath))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
