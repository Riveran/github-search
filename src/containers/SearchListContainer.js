import SearchList from '../components/SearchList/SearchList'
import { connectApi } from '../actions/index'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  connectApi: (searchPath, page, language, stars, forks, category, sortBy) =>
    dispatch(
      connectApi(searchPath, page, language, stars, forks, category, sortBy)
    )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchList)
