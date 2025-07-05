const connectedUsers = {}; 

const socketHeadersMethords = (io) =>{

    io.on('connection', (socket) => {
        // console.log(`${socket.id} connected`);
        io.emit("user-connection", `${socket.id} connected.`);

        socket.on("register-user", (username) => {
            connectedUsers[socket.id] = username;
            // console.log("Connected Users:", connectedUsers);
            io.emit("users-list", connectedUsers); 
        }); 

        socket.on("private-message", ({ to, from, msg }) => {
            console.log('in server: ',to, from , msg);
            
            io.to(to).emit("private-message", { from, msg });
        });

        socket.on("adding-in-group",(  groupName ) => {
            socket.join(groupName);
            io.to(groupName).emit("adding-in-group", `${connectedUsers[socket.id] || socket.id} joined the group ${groupName}.`);
        })

        socket.on("sending-group-chat", ( {groupName, message } ) => {
            const msgText = `${message.user}: ${message.message}`;
            io.to(groupName).emit("sending-group-chat", msgText);
        })        

        socket.on("send-message",(message)=>{
            io.emit("send-message", `${message.user}: ${message.message }`)
        })

         socket.on('disconnect', () => {
            delete connectedUsers[socket.id];
            // io.emit("users-list", connectedUsers);
            socket.broadcast.emit("user-disconnect", `${socket.id} disconnected`);
        });

    })

}

export { socketHeadersMethords }