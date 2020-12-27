const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
	{
		username: 'first username',
		password: 'first password',
		name: 'first name'
	},
	{
		username: 'second username',
		password: 'second password',
		name: 'second name'
	}
]

const additionalUser = {
	username: 'additional username',
	password: 'additional password',
	name: 'additional name'
}

const userWithoutPassword = {
	username: 'additional username',
	name: 'additional name'
}

const userWithoutUsername = {
	password: 'additional password',
	name: 'additional name'
}

const userWithShortPassword = {
	username: 'additional username',
	password: 'rd',
	name: 'additional name'
}

const userWithShortUsername = {
	username: 'me',
	password: 'additional password',
	name: 'additional name'
}

const userWithoutName = {
	password: 'additional password',
	name: 'additional name'
}

beforeEach(async () => {
	await User.deleteMany({})

	for (let user of initialUsers) {
		let userObject = new User(user)
		await userObject.save()
	}
})

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(note => note.toJSON())
}

test('users are returned as json', async () => {
	await api
		.get('/api/users')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('users have "username" field', async () => {
	const users = await usersInDb()
	expect(users[0].username).toBeDefined()
})

test('users can be added', async () => {
	const usersStart = await usersInDb()

	await api
		.post('/api/users')
		.send(additionalUser)

	const usersEnd = await usersInDb()
	expect(usersEnd.length).toBe(usersStart.length + 1)
})

test('users without username response with 400', async () => {
	const res = await api
		.post('/api/users')
		.send(userWithoutUsername)
		.expect(400)
	expect(res.body.error).toContain('`username` is required')
})

test('users without password response with 400', async () => {
	const res = await api
		.post('/api/users')
		.send(userWithoutPassword)
		.expect(400)
	expect(res.body.error).toContain('3 characters')
})

test('users with too short username response with 400', async () => {
	const res = await api
		.post('/api/users')
		.send(userWithShortUsername)
		.expect(400)
	expect(res.body.error).toContain('is shorter than the minimum')
})

test('users with too short password response with 400', async () => {
	const res = await api
		.post('/api/users')
		.send(userWithShortPassword)
		.expect(400)
	expect(res.body.error).toContain('3 characters')
})

test('users can be deleted', async () => {
	const usersStart = await usersInDb()
	const idToDelete = usersStart[0].id

	await api
		.delete(`/api/users/${idToDelete}`)
		.expect(204)

	const usersEnd = await usersInDb()
	expect(usersEnd.length).toBe(usersStart.length - 1)
})

test('users can be updated', async () => {
	const usersStart = await usersInDb()
	const idToUpdate = usersStart[0].id

	const user = {
		username: 'updated username',
		password: 'updated password',
		name: 'updated name'
	}

	await api
		.put(`/api/users/${idToUpdate}`)
		.send(user)
		.expect(200)

	const usersEnd = await usersInDb()
	expect(usersEnd[0].likes).toBe(user.likes)
})

afterAll(() => {
	mongoose.connection.close()
})
