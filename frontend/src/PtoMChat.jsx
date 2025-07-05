import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useContext } from "react";
import { User } from "./App.jsx";

export function PtoMChat() {
  const [logs, setLogs] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState({});

  let { user, setUser, navigate } = useContext(User);

  const currentID = socket.id;

  useEffect(() => {
    socket.on("user-connection", (msg) => {
      setLogs((prev) => [...prev, msg]);
      console.log("your sockit id", socket.id);

    });

    socket.on("adding-in-group", (msg) => {
      setLogs((prev) => [...prev, `a user is connected to group ${msg}`]);
    
    });
    
    socket.on("sending-group-chat", (msg) => {
      setLogs((prev) => [...prev, `group message to every-one ${msg}`]);
    
    });

    socket.on("user-disconnect", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("user-connection");
      socket.off("adding-in-group");
      socket.off("sending-group-chat");
      socket.off("user-disconnect");
    };
  }, []);
  const JoinGroupFn = () => {
    socket.emit("adding-in-group", groupName)

  }
  const sendToGroupFn = () => {
    socket.emit("sending-group-chat", { groupName, message })
  }

  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Socket.IO React Client</h2>
        {logs.map((log, i) => (
          <p key={i}>{log}</p>
        ))}
      </div>

      <label htmlFor="inpid">Enter Group name to Join group</label>
      <input type="text" id="inpid" onChange={e => (setGroupName(e.target.value))} />
      <button type="submit" onClick={JoinGroupFn}>send</button> <br/>

      <label htmlFor="inp">Enter message</label>
      <input type="text" className="inp-text" id="inp" onChange={(e) => {
        setMessage((prev) => ({
          ...prev,
          'message': e.target.value,
          'user': user
        }))
        // console.log("just after setMessage: ", message);

      }} />
      <button type="submit" onClick={sendToGroupFn}>send</button>

    </>
  );
}