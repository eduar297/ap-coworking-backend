const { io } = require('./app'),

    connectedUserHandler = () => {
        io.on("connection", socket => {
            console.log(`Client ${socket.id} connected`)
            socket.on("disconnect", () => {
                console.log(`Client ${socket.id} disconnected`)
            })

            socket.on("onLogged", user => {
                socket.join(user.userId)
            })
        })
    },

    emitMsg = (accountId, notification) => {
        io.in(accountId).emit("notificationAlert", notification)
    }

ioCtr = {}
ioCtr.connectedUserHandler = connectedUserHandler
ioCtr.emitMsg = emitMsg

module.exports = ioCtr