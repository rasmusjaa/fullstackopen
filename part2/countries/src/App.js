import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import './App.css'

const searchKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => haystack[key].toLowerCase().includes(needle))
	return filtered
}

function App() {
	const [ countries, setCountries ] = useState([])
	const [filter, setFilter] = useState('')
	
	useEffect(() => {
		axios
		.get('https://restcountries.eu/rest/v2/all')
		.then(response => {
			setCountries(response.data)
		})
	}, [])
	
	return (
		<div>
			<Filter setFilter={setFilter} />
			<Countries countries={searchKeyValue(countries, 'name', filter)} setFilter={setFilter} />
			
		</div>
	)
}

export default App;
