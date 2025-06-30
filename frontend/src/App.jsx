// App.jsx or any component
import { useEffect, useState } from "react";
import { socket } from "./socket";
import './App.css'

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("user-connection", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    socket.on("user-disconnect", (msg) => {
      setLogs((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("user-connection");
      socket.off("user-disconnect");
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Socket.IO React Client</h2>
      {logs.map((log, i) => (
        <p key={i}>{log}</p>
      ))}
    </div>
  );
}

export default App;
