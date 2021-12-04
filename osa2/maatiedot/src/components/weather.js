import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Weather = ({ country }) => {
    //const api_key = process.env.REACT_APP_API_KEY
    const [weatherData, setWeatherData] = useState([])
    //console.log(`${process.env.REACT_APP_API_URL}?access_key=${api_key}&query=${encodeURI(country.capital)}`)
    
    useEffect(() => {
        console.log('effect')
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`${process.env.REACT_APP_API_URL}?access_key=${api_key}&query=${encodeURI(country.capital)}`)
            .then(response => {
                console.log("response ok")
                setWeatherData(response.data)
            })
    }, [])

    console.log('weatherData', weatherData)
    if (weatherData.length !== 0) {
        return (
            <div>
                <h3>Weather in {country.capital}</h3>
                <p><b>Temperature: {weatherData.current.temperature}</b></p>
                <img src={weatherData.current.weather_icons} width="100"></img>
                <p><b>Wind: </b>{weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
            </div>        
        )
    } else {
        return (
            <div>
                <h3>Weather in {country.capital}</h3>
                <p>No weather data</p>
            </div>
        )
    }
    
}

export default Weather