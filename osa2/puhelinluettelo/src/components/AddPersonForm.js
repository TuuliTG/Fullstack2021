import React from "react";

const Form = (props) => {
    const addName = (event) => {
        event.preventDefault()
        const isAlreadyOnList = props.persons.some(person => person.name === props.newName)
        
        if (isAlreadyOnList) {
          window.alert(`${props.newName} is already added to phonebook`)
        } else {
          
          props.addPersons()
        }
        
        props.setName('')
        props.setNewNumber('')
      }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        props.setName(event.target.value)
    }
    
    const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value)
    }
    return (
        <div>
            <form onSubmit={addName}>
                <div>
                name: <input value={props.newName} onChange={handleNameChange}/>
                </div>
                <div>
                number: <input value={props.newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form