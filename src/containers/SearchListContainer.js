import SearchList from '../components/SearchList/SearchList'
import { connectApi } from '../actions/index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  connectApi: (searchPath, number) => dispatch(connectApi(searchPath, number))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchList)
