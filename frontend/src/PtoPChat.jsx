import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useContext } from "react";
import { User } from "./App.jsx";

export function PtoPChat() {
    const [logs, setLogs] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState({});
    
    let { user, setUser, navigate } = useContext(User);

    useEffect(() => {
    socket.on("user-connection", (msg) => {
      setLogs((prev) => [...prev, msg]);
      console.log("your sockit id",socket.id);
      
    });

    socket.on("private-message", ({from, msg}) => {
        console.log("to client from server at last: from ", from);
        console.log("to client from server at last: msg ",  msg);
        
      setLogs((prev) => [...prev, `Private message from ${from}: ${msg}`]);
    });

    socket.on("user-disconnect", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("user-connection");
      socket.off("private-message"); 
      socket.off("user-disconnect");
    };
  }, []);

    const sendToPersonFn = () => {
        socket.emit("private-message",{
            to: userId,
            from: `${user}: ${socket.id} `,
            msg: message.message
            // message: `${user}: ${message.message}`
        })
        // socket.to(userId).emit('send-message', message);
    }

    return (
        <>
            <div style={{ padding: 20 }}>
                <h2>Socket.IO React Client</h2>
                {logs.map((log, i) => (
                    <p key={i}>{log}</p>
                ))}
            </div>
            
            <label htmlFor="inpid">Enter Sockit.id of other persion</label>
            <input type="text" id="inpid" onChange={ e => (setUserId(e.target.value)) } />

            <label htmlFor="inp">Enter message</label>
            <input type="text" className="inp-text" id="inp" onChange={(e) => {
                setMessage((prev) => ({
                    ...prev,
                    'message': e.target.value,
                    'user': user
                }))
                console.log("just after setMessage: ",message);
                
            }} />
            <button type="submit" onClick={sendToPersonFn}>send</button>
        </>
    );
}