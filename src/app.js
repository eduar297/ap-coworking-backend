require('dotenv').config()

const express = require('express'),
    http = require('http'),
    socketIo = require('socket.io'),
    cors = require('cors'),
    app = express(),
    server = http.createServer(app),
    io = socketIo(server);

//settings

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use('/api/account', require('./routes/account'))

app.use('/api/professional', require('./routes/professional'))
//app.use('/api/client', require('./routes/client'))

app.use('/api/notification', require('./routes/notification'))
app.use('/api/office', require('./routes/office'))

app.use('/api/sendmail', require('./routes/sendMail'))

module.exports = { server, io }