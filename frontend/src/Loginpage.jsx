import { useState } from "react";
import { useContext } from "react";
import { User } from "./App.jsx";

export function Loginpage() {
    let { user, setUser, navigate } = useContext(User);
    
    const helperFN = () => {
        console.log("loginpage user value:- ",user);
        
        navigate('/user/chat')
    }
  return (
    <>
      <div>
        <h2>Enter user name</h2>
        <input type="text" className="inp" onChange={ (e)=>{
            setUser(e.target.value)
        } } />
        <button onClick={helperFN}>submit</button>
      </div>
    </>
  );
}