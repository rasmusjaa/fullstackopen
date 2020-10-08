import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ copyPersons, setCopyPersons ] = useState( JSON.parse(JSON.stringify(persons)) )

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
				setCopyPersons(response.data)
			})
	}, [])

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter persons={persons} setCopyPersons={setCopyPersons} />
			<h2>Add a new</h2>
			<PersonForm persons={persons} setPersons={setPersons} setCopyPersons={setCopyPersons} />
			<h2>Numbers</h2>
			{copyPersons.map((person) => 
				<Person key={person.name} name={person.name} number={person.number} />
			)}
		</div>
	)
}

export default App
