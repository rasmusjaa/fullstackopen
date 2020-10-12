import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherData = ({capital}) => {
	const [ weather, setWeather ] = useState([])

	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
			.then(response => {
				setWeather(response.data)
			})
	}, [capital])
	if (weather.name) {
		const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
		return (
			<div>
				<h3>Weather in {weather.name}</h3>
				<p><b>temperature: </b>{weather.main.temp} Celcius</p>
				<img src={icon} alt=""/>
				<p><b>wind: </b>{weather.wind.speed} m/s direction {weather.wind.deg} deg</p>
			</div>
		)
	}
	return <div></div>
}

const CountryData = ({country}) =>  {
	
	return (
		<div>
			<h2>{country.name}</h2>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h3>languages</h3>
			<div>
				{country.languages.map((language) =>
					<li key={language.name}>{language.name}</li>
				)}
			</div>
			<img src={country.flag} alt=""/>
			<WeatherData capital={country.capital} />
			
		</div>
	)
}

const Country = ({ country, length, setFilter }) => {
	const showCountry = () => {
		setFilter(country.name)
	}

	if (length > 1)
	return (
		<p>{country.name}<button onClick={showCountry}>show</button></p>
	)
	return (
		<div>
			<CountryData country={country} />
		</div>
	)
}

const Countries = ({ countries, setFilter }) => {
	const length = countries.length

	if (length > 10)
		return <p>Too many matches, specify another filter</p>
	if (length > 0) {
		return (
			<div>
				{countries.map((country) =>
					<Country key={country.name} country={country} length={length} setFilter={setFilter} />
				)}
			</div>
		)
	}
	return <p>No countries found</p>
}

export default Countries
