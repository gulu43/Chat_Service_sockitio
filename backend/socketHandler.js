const socketHeadersMethords = (io) =>{
    io.on('connection', (socket)=>{
        io.emit("user-connection", `${socket.id} connected.`) 

        socket.on("send-message",(message)=>{
            io.emit("send-message", `${message.user}: ${message.message }`)
        })

        socket.on('disconnect', ()=>{
            socket.broadcast.emit("user-disconnect", `${socket.id} disconnected`)
        })

    })
}

export { socketHeadersMethords }