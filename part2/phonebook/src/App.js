import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import phonebookService from './services/phonebook'

const searchKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => haystack[key].toLowerCase().includes(needle))
	return filtered
}

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ filter, setFilter ] = useState('')

	useEffect(() => {
		phonebookService
			.getAll()
			.then(allPersons => {
				setPersons(allPersons)
			})
			.catch(error => {
				alert(
					`couldn't retrieve phonebook from server`
				)
			})
	}, [])

	const deletePerson = (person) => {
		if (window.confirm('Delete ' + person.name + '?'))
			phonebookService
				.remove(person.id)
				.then( () => setPersons(persons.filter(n => n.id !== person.id)))
				.catch(error => {
					alert(
						`couldn't delete '${person.name}' from server`
					)
					setPersons(persons.filter(n => n.name !== person.name))
				})
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter setFilter={setFilter} />
			<h2>Add a new</h2>
			<PersonForm persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			{searchKeyValue(persons, 'name', filter).map((person) => 
				<Person key={person.name} name={person.name} number={person.number} deletePerson={ () => deletePerson(person)} />
			)}
		</div>
	)
}

export default App
