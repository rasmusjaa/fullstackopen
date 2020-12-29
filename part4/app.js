const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)

module.exports = app
