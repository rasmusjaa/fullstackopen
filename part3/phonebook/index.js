const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(express.static('build'))

app.use(cors())

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
	  {
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	  },
	  {
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	  },
	  {
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	  },
	  {
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	  }
]

app.get('/info', (req, res) => {
	const time = new Date()
	const body = `<p>Phonebook has info for ${persons.length} people</p><p>${time}</p>`
	res.send(body)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)
	if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const body = req.body
	if (!body.name || !body.number) {
		return res.status(400).json({ 
		  error: 'name or number is missing' 
		})
	}

	if (persons.find(person => person.name === body.name)) {
		return res.status(400).json({ 
		  error: 'name must be unique' 
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: Math.floor(Math.random() * Math.floor(999999999))
	}

	persons = persons.concat(person)
	res.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
