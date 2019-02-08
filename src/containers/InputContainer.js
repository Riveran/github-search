import Input from '../components/Input/Input'
import { connectApi } from '../actions/index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  connectApi: (searchPath, number = 1) =>
    dispatch(connectApi(searchPath, (number = 1)))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
