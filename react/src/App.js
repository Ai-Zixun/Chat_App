import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'
import Chatroom from './Chatroom/Chatroom'
import API from './API/API';

function App() {
    const [page, setPage] = useState("chatroom");
    const [id, setID] = useState(0);
    
    const socket = socketIOClient(API.API_URL);

    const getPageHandler = () => {
        switch (page) {
            case "login":
                return <Login setPage={setPage} setID={setID} />;
            case "createAccount":
                return <CreateAccount setPage={setPage} setID={setID} />;
            case "chatroom":
                return <Chatroom 
                    socket={socket}
                    setPage={setPage} 
                    id={id} 
                    setID={setID} 
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
