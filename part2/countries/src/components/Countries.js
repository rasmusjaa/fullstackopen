import React, { useState, useEffect } from 'react'
import axios from 'axios'

const searchKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => haystack[key].toLowerCase().includes(needle))
	return filtered
}

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
	if (weather.name)
	{
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
					<Language key={language.name} name={language.name} />
				)}
			</div>
			<img src={country.flag} alt=""/>
			<WeatherData capital={country.capital} />
			
		</div>
	)
}

const Language = ({name}) => <li>{name}</li>

const Country = ({countries, country, setCopyCountries, length}) => {
	const showCountry = () => {
		const copy = searchKeyValue(countries, 'name', country.name)
		setCopyCountries(copy)
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

const Countries = ({ countries, setCountries, copyCountries, setCopyCountries }) => {

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
				setCopyCountries(response.data)
			})
	}, [setCountries, setCopyCountries])

	const length = copyCountries.length

	if (length > 10)
		return <p>Too many matches, specify another filter</p>
	if (length > 0)
		return (
			<div>
				{copyCountries.map((country) =>
					<Country key={country.name} countries={countries} country={country} setCopyCountries={setCopyCountries} length={length} />
				)}
			</div>
		)
	return <p>No countries found</p>
}

export default Countries
