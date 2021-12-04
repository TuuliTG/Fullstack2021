import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchBar, setSearchBar] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const setSearchBarText = (text) => setSearchBar(text)

  return (
    <div>
      <Search searchBar={searchBar} setSearchBar={setSearchBarText}></Search>
      <h2>Countries</h2>
      <Countries filter={searchBar} countries={countries} 
          onShow={country=>setSearchBarText(country.name.common)}>

      </Countries>
      
    </div>
  )
}

export default App;
