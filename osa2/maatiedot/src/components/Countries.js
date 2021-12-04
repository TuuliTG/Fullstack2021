import React from "react";
import Country from "./Country";

const Countries = (props) => {
    const filtered = props.countries.filter(
        country => 
            country
                .name
                .common
                .toLowerCase()
                .includes(props.filter.toLowerCase())
    )
    console.log('filtered', filtered)
    if (filtered.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (filtered.length > 1) {
        return (
            <ul>
                {filtered.map(country => 
                    <li key={country.name.common} >
                        {country.name.common}
                        <button onClick={() => props.onShow(country)}>Show</button>
                    </li>   
                )}
            </ul>
        )
    } else if (filtered.length === 1){
        return (
            <div>
                <Country country={filtered[0]}></Country>
            </div>
            
        )
    }  else {
        return (
            <div>
                <p>No countries to show</p>
            </div>
        )
    }
}

export default Countries