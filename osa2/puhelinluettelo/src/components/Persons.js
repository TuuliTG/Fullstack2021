import React from "react";

const Persons = (props) => {
    const filtered = props.persons.filter( 
        person => 
        person.name.toLowerCase().includes(props.filter.toLowerCase())
        || (person.number !== undefined && person.number.includes(props.filter))
    )
    
    return (
        <ul>
            {filtered.map(person =>
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          )}
        </ul>
    )
}

export default Persons