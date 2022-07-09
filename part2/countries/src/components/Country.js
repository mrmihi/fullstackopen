import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {

const [weather, setWeather] = useState([])
  
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        console.log(api_key)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
            .then(response => response.data)
            .then(responce => setWeather([responce]))
            .catch(error => {
            console.log(error);
        })
    }, [])

    if (weather.length > 0) {
        const currentWeather = weather[0].weather[0]
        const currentWeatherIcon = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <p>Area: {country.area}</p>
                <img src={country.flags.svg} alt="Country flag"></img>
                <h2>Weather in {country.capital}</h2>
                <p>{currentWeather.main}</p>
                <p>{currentWeather.description}</p>
                <img src={currentWeatherIcon} alt="weather-icon"></img>
                {/* <p>temperature: {currentWeather.temperature}° Celcius</p>
                <img src={currentWeather.weather_icons[0]} "alt="Weather icon></img>
                <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p> */}
            </div>
        )
    }
    else {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area}</p>
            <img src={country.flags.svg} alt="Country flag"></img>
        </div>
    )
    }
}

export default Country