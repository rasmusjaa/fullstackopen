import React, { useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import './App.css'



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
