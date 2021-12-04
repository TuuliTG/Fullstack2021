import React from "react";

const Country = (country) => {
    console.log('country ', country.country.name)
    return (
        <div>
            <h2>{country.country.name.common}</h2>
            <p><b>Capital: </b>{country.country.capital}</p>
            <p><b>Independent: </b>{country.country.independent.toString()}</p>
        </div>        
    )
}

export default Country