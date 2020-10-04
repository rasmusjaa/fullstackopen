import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({text}) => <h2>{text}</h2>

const Anecdote = ({index, votes}) => {
	return (
		<div>
			{anecdotes[index]}<br />
			has {votes} votes
		</div>
	)
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = ({anecdotes}) => {
	const anecdoteCount = anecdotes.length
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Uint8Array(anecdoteCount))
	
	const mostVoted = () => {
		let max = 0
		for (let i = 0; i < anecdoteCount; i++) {
			if (votes[i] > votes[max]) {
				max = i;
			}
		}
		return max
	}
	
	const randomAnecdote = () => {
		const random = Math.floor(Math.random() * anecdoteCount)
		if (random === selected && anecdoteCount > 1)
			randomAnecdote()
		else
			setSelected(random)
	}
	
	const vote = () => {
		const copy = { ...votes }
		copy[selected]++
		setVotes(copy)
	}
	
	const mostVotedIndex = mostVoted()
	
	return (
		<div>
			<Heading text="Anecdote of the day" />
			<Anecdote index={selected} votes={votes[selected]} />
			<Button handleClick={() => vote() } text="vote" />
			<Button handleClick={() => randomAnecdote() } text="next anecdote" />
			<Heading text="Anecdote with most votes" />
			<Anecdote index={mostVotedIndex} votes={votes[mostVotedIndex]} />
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)
