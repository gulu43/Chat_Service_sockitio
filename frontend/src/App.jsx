import './App.css'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Loginpage } from './Loginpage.jsx';
import { ChatArea } from './ChatArea.jsx';
import { createContext } from 'react';
import { useState } from 'react';

export const User = createContext();

function App() {
  const url = import.meta.env.VITE_SOCKET_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  return (

    <User.Provider value={ { user, setUser, navigate } }>
      
      {/* <Link to={`${url}/user/login`}>Login</Link>
      <Link to={`${url}/user/chat`}>chat</Link>
      <Link to={`${url}/`}>Home</Link> */}

      <Routes>
        <Route path='/' element={<Navigate to="/user/login" />} />
        <Route path='/user/login' element={ <Loginpage/> } />
        <Route path='/user/chat' element={ <ChatArea/> } />
      </Routes>
    </ User.Provider >
  );
}

export default App;
