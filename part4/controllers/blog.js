const blogRouter = require('express').Router()
const Blog = require('../models/blogpost')

blogRouter.get('/', async (request, response) => {
	const blogposts = await Blog.find({})
	console.log(blogposts)
	response.json(blogposts)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	console.log(blog)

	const result = await blog.save()
	response.status(201).json(result)
})

module.exports = blogRouter
