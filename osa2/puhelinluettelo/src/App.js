import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Search from './components/Search'
import Form from './components/AddPersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchBar, setSearchBar] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  
  const addNewPersons = () => {
    const isAlreadyOnList = persons.some(person => person.name === newName)
    
    if (isAlreadyOnList) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)) {
        const person = persons.find(p => p.name = newName)
        updatePerson(person)
      } else {
        emptyForm() 
      }
      
    } else {
      const hasNumber = newNumber.length > 0
      const nameObject = {
        name: newName,
        number: hasNumber ? newNumber : ''
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          console.log('successful post')
          setPersons(persons.concat(returnedPerson))
          emptyForm()   
        })
    }
    
  }

  const updatePerson = ({person}) => {
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        emptyForm()
      })
  }

  const deletePersonWithId = (id) => {
    console.log(`${id} needs to be deleted`)
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then(returned => {
          console.log('deleted',returned)
          setPersons(persons.filter(p => p.id !== id))
      })
    }
    
  }
  const emptyForm = () => {
    setNewName('')
    setNumber('')
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
      <Persons persons = {persons} deletePerson = {(person) => deletePersonWithId(person.id)} filter={searchBar}></Persons>
    </div>
  )

}

export default App;
