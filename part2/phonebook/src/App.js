import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [ copyPersons, setCopyPersons ] = useState( JSON.parse(JSON.stringify(persons)) )

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
