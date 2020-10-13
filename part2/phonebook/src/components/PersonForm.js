import React, { useState } from 'react'

const containsKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => {
		if (haystack[key].toLowerCase().includes(needle) && haystack[key].length === needle.length)
			return true
		return false
	})
	return filtered.length > 0
}

const PersonForm = ({ persons, setPersons }) => {
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		if (containsKeyValue(persons, 'name', newName)) {
			alert(`${newName} is already added to phonebook`)
		} else if (containsKeyValue(persons, 'number', newNumber)) {
				alert(`${newNumber} is already added to phonebook`)
		} else if (newName !== '' && newNumber!== '') {
			const copy = persons.concat({name: newName, number: newNumber})
            setPersons(copy)
			setNewName('')
            setNewNumber('')
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	return (
		<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange}  />
					</div>
				<div>
					<button type="submit">add</button>
				</div>
		</form>
	)
}

export default PersonForm
