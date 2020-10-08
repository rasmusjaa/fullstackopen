import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const searchKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => haystack[key].toLowerCase().includes(needle))
	return filtered
}

const Filter = ({countries, setCopyCountries}) => {
	const handleFilterChange = (event) => {
		const copy = searchKeyValue(countries, 'name', event.target.value)
		setCopyCountries(copy)
	}

	return (
		<div>
			find countries <input onChange={handleFilterChange} />
		</div>
	)
}

const Language = ({name}) => <li>{name}</li>

const Country = ({country, length}) => {
	if (length > 1)
	return (
		<p>{country.name}</p>
	)
	console.log(country);
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
		</div>
	)
}

const Countries = ({countries, setCountries, copyCountries, setCopyCountries}) => {

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
				setCopyCountries(response.data)
			})
	}, [])

	const length = copyCountries.length

	if (length > 10)
		return <p>Too many matches, specify another filter</p>
	if (length > 0)
		return (
			<div>
				{copyCountries.map((country) =>
					<Country key={country.name} country={country} length={length} />
				)}
			</div>
		)
	return <p>No countries found</p>
}

function App() {
	const [ countries, setCountries ] = useState([])
	const [ copyCountries, setCopyCountries ] = useState([])
	

	return (
		<div>
			<Filter countries={countries} setCopyCountries={setCopyCountries} />
			<Countries countries={countries} setCountries={setCountries} copyCountries={copyCountries} setCopyCountries={setCopyCountries} />
			
		</div>
	)
}

export default App;
