const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/blogpost')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
	{
		title: 'first title',
		author: 'first author',
		url: 'first url',
		likes: 1
	},
	{
		title: 'second title',
		author: 'second author',
		url: 'second url',
		likes: 2
	}
]

const testUser = {
	username: 'test username',
	password: 'test password',
	name: 'test name'
}

const additionalBlog = {
	title: 'additional title',
	author: 'additional author',
	url: 'additional url',
	likes: 42
}

const blogWithoutLikes = {
	title: 'additional title',
	author: 'additional author',
	url: 'additional url'
}

const blogWithoutTitleUrl = {
	author: 'additional author',
	likes: 42
}

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
	const user = new User(testUser)
	const savedUser = await user.save()
	await Blog.updateMany({}, { $set: { user: savedUser._id } })
})

const getToken = async () => {
	const user = await User.findOne({ username: testUser.username })
	const userForToken = {
		username: user.username,
		id: user._id,
	}

	return jwt.sign(userForToken, process.env.SECRET)
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(note => note.toJSON())
}

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('blogs have "id" field', async () => {
	const blogs = await blogsInDb()
	expect(blogs[0].id).toBeDefined()
})

test('blogs can be added', async () => {
	const blogsStart = await blogsInDb()

	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${await getToken()}`)
		.send(additionalBlog)

	const blogsEnd = await blogsInDb()
	expect(blogsEnd.length).toBe(blogsStart.length + 1)
})

test('blogs default likes is set to 0', async () => {
	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${await getToken()}`)
		.send(blogWithoutLikes)

	const blogsEnd = await blogsInDb()

	expect(blogsEnd[blogsEnd.length - 1].likes).toBe(0)
})

test('blogs without title and url response with 400', async () => {
	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${await getToken()}`)
		.send(blogWithoutTitleUrl)
		.expect(400)
})

test('blogs can be deleted', async () => {
	const blogsStart = await blogsInDb()
	const idToDelete = blogsStart[0].id

	await api
		.delete(`/api/blogs/${idToDelete}`)
		.set('Authorization', `bearer ${await getToken()}`)
		.expect(204)

	const blogsEnd = await blogsInDb()
	expect(blogsEnd.length).toBe(blogsStart.length - 1)
})

test('blogs can be updated', async () => {
	const blogsStart = await blogsInDb()
	const idToUpdate = blogsStart[0].id
	const updatedLikes = blogsStart[0].id + 1

	const blog = {
		title: 'updated title',
		author: 'updated author',
		url: 'updated url',
		likes: 42
	}

	await api
		.put(`/api/blogs/${idToUpdate}`)
		.send(blog)
		.expect(200)

	const blogsEnd = await blogsInDb()
	expect(blogsEnd[0].likes).toBe(blog.likes)
})

test('adding blog without token responds with 401 status', async () => {
	const blogsStart = await blogsInDb()

	await api
		.post('/api/blogs')
		.send(additionalBlog)
		.expect(401)
})

afterAll(() => {
	mongoose.connection.close()
})
