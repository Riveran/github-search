import React, { Component } from 'react'
import Filtres from './components/Filtres/Filtres'
import InputContainer from './containers/InputContainer'
import SearchListContainer from './containers/SearchListContainer'
import Category from './components/Category/Category'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='main-wrapper'>
        <InputContainer />
        <div className='wrapper'>
          <Category />
          <SearchListContainer />
          <Filtres />
        </div>
      </div>
    )
  }
}

export default App
