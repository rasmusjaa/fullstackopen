const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
	const users = await User
		.find({})
		.find({})
		.populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
	console.log(users)
	response.json(users)
})

userRouter.post('/', async (request, response) => {
	const body = request.body

	if (body.password === undefined || body.password.length < 3)
		response.status(400).json({ error: 'password must be at least 3 characters' })

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		passwordHash: passwordHash,
		name: body.name,
	})

	const result = await user.save()

	response.status(201).json(result)
})

userRouter.delete('/:id', async (request, response) => {
	await User.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

userRouter.put('/:id', async (request, response) => {
	const body = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = {
		username: body.username,
		passwordHash: passwordHash,
		name: body.name,
	}

	const result = await User.findByIdAndUpdate(request.params.id, user, { new: true })
	response.status(200).json(result)
})

module.exports = userRouter
