import React, { Component } from 'react'
import InputContainer from './containers/InputContainer'
import SearchListContainer from './containers/SearchListContainer'
import CategoryContainer from './containers/CategoryContainer'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='main-wrapper'>
        <InputContainer />
        <div className='wrapper'>
          <CategoryContainer />
          <SearchListContainer />
        </div>
      </div>
    )
  }
}

export default App
