import React, { Component } from 'react'
import InputContainer from './containers/InputContainer'
import SearchListContainer from './containers/SearchListContainer'
import CategoryContainer from './containers/CategoryContainer'
import './App.css'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    return (
      <div className='main-wrapper'>
        <InputContainer />
        {this.props.data.searchPath ? (
          <div className='wrapper'>
            <CategoryContainer />
            <SearchListContainer />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
