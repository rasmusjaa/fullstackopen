import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value, sign}) => <tr><td>{text}</td><td>{value} {sign}</td></tr>

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad
	if (total === 0)
		return <p>No feedback given</p>
	const average = (good - bad) / total
	const positive = good / total * 100

	return(
		<table>
			<tbody>
				<Statistic text="good" value={good} />
				<Statistic text="neutral" value={neutral} />
				<Statistic text="bad" value={bad} />
				<Statistic text="average" value={average} />
				<Statistic text="positive" value={positive} sign="%" />
		  </tbody>
		</table>
	  )

}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const addGood = (value) => setGood(value)
	const addNeutral = (value) => setNeutral(value)
	const addBad = (value) => setBad(value)
	
	return (
		<div>
			<Header text="give feedback" />
			<Button handleClick={() => addGood(good + 1)} text="good" />
			<Button handleClick={() => addNeutral(neutral + 1)} text="neutral" />
			<Button handleClick={() => addBad(bad + 1)} text="bad" />
			<Header text="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
