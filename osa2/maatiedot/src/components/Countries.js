import React from "react";
import Country from "./Country";
import Languages from "./Languages";
import Weather from "./weather";

const Countries = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
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
                <h3>Languages</h3>
                <Languages country={filtered[0]}></Languages>
                <img src={filtered[0].flags.png} width="150"></img>
                <Weather country={filtered[0]}></Weather>
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