// App.jsx or any component
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useContext } from "react";
import { User } from "./App.jsx";
import './Chat.css'

function ChatArea() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState({});
  let { user, setUser, navigate } = useContext(User);

//   const user = 'Gulu'
  useEffect(() => {
    socket.on("user-connection", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    socket.on("register-user", (msg) => {
      setLogs( prev => ({ ...prev, msg}) );
    });

    socket.on("send-message", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    socket.on("user-disconnect", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("user-connection");
      socket.off("register-user"); 
      socket.off("send-message"); 
      socket.off("user-disconnect");
    };
  }, []);

  function sendFn() {
    socket.emit("send-message", message);
  }

  const navPToPChat = () => {
        navigate('/user/ptopchat')
    }
  const navPToMChat = () => {
        navigate('/user/ptomchat')
    }

  return (
    <>
    <div style={{ padding: 20 }}>
      <h2>Socket.IO React Client</h2>
      {logs.map((log, i) => (
        <p key={i}>{log}</p>
      ))}
    </div>
    <h3>For input</h3>
    <input type="text" className="inp-text" id="" onChange={ (e)=>{
      setMessage((prev)=>({
        ...prev,
        'message': e.target.value,
        'user': user
      }))
    } } />
    <button type="submit" className="btn" onClick={sendFn}>click to send</button><br/><br/><br/>
    <div>you have to find user by sockit.id not username</div>
    <button type="submit" className="btn" onClick={ navPToPChat}>Private Chat</button>
    <br/>
    <div>you have to add people by socket.id not username</div>
    <button type="submit" className="btn" onClick={navPToMChat}>Group Chat</button>
    </>
  );
}

export { ChatArea };
