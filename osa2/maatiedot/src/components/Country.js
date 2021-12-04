import React from "react";
import Languages from "./Languages";
import Weather from "./weather";

const Country = (country) => {
    console.log('country ', country.country.name)
    return (
        <div>
            <h2>{country.country.name.common}</h2>
            <p><b>Capital: </b>{country.country.capital}</p>
            <p><b>Independent: </b>{country.country.independent.toString()}</p>
            <h3>Languages</h3>
            <Languages country={country.country}></Languages>
            <img src={country.country.flags.png} width="150"></img>
            <Weather country={country.country}></Weather>
        </div>        
    )
}

export default Country