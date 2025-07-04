import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useContext } from "react";
import { User } from "./App.jsx";

export function PtoMChat() {
    const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState({});
  let { user, setUser, navigate } = useContext(User);
  
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
  
  return (
    <>
      
    </>
  );
}