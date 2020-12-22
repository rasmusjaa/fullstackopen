const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogpost')

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

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

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
		.send(additionalBlog)

	const blogsEnd = await blogsInDb()
	expect(blogsEnd.length).toBe(blogsStart.length + 1)
})

test('blogs default likes is set to 0', async () => {
	await api
		.post('/api/blogs')
		.send(blogWithoutLikes)

	const blogsEnd = await blogsInDb()

	expect(blogsEnd[blogsEnd.length - 1].likes).toBe(0)
})

test('blogs withoout title and url response with 400', async () => {
	await api
		.post('/api/blogs')
		.send(blogWithoutTitleUrl)
		.expect(400)
})

afterAll(() => {
	mongoose.connection.close()
})
