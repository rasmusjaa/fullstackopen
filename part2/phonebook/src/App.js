import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const searchKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => haystack[key].toLowerCase().includes(needle))
	return filtered
}

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter setFilter={setFilter} />
			<h2>Add a new</h2>
			<PersonForm persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			{searchKeyValue(persons, 'name', filter).map((person) => 
				<Person key={person.name} name={person.name} number={person.number} />
			)}
		</div>
	)
}

export default App
