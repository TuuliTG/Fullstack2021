import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Search from './components/Search'
import Form from './components/AddPersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchBar, setSearchBar] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  const addNewPersons = () => {
    const hasNumber = newNumber.length > 0
    const nameObject = {
      name: newName,
      number: hasNumber ? newNumber : ''
    }
    setPersons(persons.concat(nameObject))
  }

  const setName = (name) => setNewName(name)
  const setNewNumber = (number) => setNumber(number)
  const setSearchBarText = (text) => setSearchBar(text)

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchBar={searchBar} setSearchBar={setSearchBarText}></Search>
      <h2>Add a new contact</h2>
      <Form persons={persons} setName={setName} setNewNumber={setNewNumber} addPersons={addNewPersons} newName={newName}
        newNumber={newNumber}
      >
      </Form>
      <h2>Numbers</h2>
      <Persons persons = {persons} filter={searchBar}></Persons>
    </div>
  )

}

export default App;
