import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'
import Chatroom from './Chatroom/Chatroom'
import API from './API/API';

function App() {
    // Global Data 
    const [page, setPage] = useState("chatroom");
    const [id, setID] = useState(0);
    

    // Chatroom Data 
    const [messages, setMessages] = useState([]);



    const getPageHandler = () => {
        switch (page) {
            case "login":
                return <Login setPage={setPage} setID={setID} />;
            case "createAccount":
                return <CreateAccount setPage={setPage} setID={setID} />;
            case "chatroom":
                return <Chatroom 
                    setPage={setPage} 
                    id={id} 
                    setID={setID} 
                    messages={messages}
                    setMessages={setMessages}
                />;
            default:
                return <Login setPage={setPage} setID={setID} />;
        }
    }

    return (
        <div>
            {getPageHandler()}
        </div>
    );
}

export default App;
