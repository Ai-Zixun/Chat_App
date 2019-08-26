import React, { useState } from 'react';
import './App.css';

import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'
import Chatroom from './Chatroom/Chatroom'

function App() {
    const [page, setPage] = useState("login");
    const [id, setID] = useState(-1);

    const getPageHandler = () => {
        switch (page) {
            case "setPage":
                return <Login setPage={setPage} setID={setID}/>;
            case "createAccount":
                return <CreateAccount setPage={setPage} setID={setID}/>;
            case "chatroom":
                return <Chatroom setPage={setPage} id={id}/>;
            default:
                return <Login setPage={setPage} setID={setID}/>;
        }
    }

    return (
        <div>
            {getPageHandler()}
        </div>
    );
}

export default App;
