import React, { useState }  from 'react';
import './App.css';

import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount'

function App() {
    const [page, setPage] = useState("createAccount");

    const getPageHandler = () => {
        switch (page) {
            case "login":
                return <Login></Login>;
            case "createAccount":
                return <CreateAccount></CreateAccount>;
            default:
                return <Login></Login>;
        }
    }

    return (
        <div>
            {getPageHandler()}
        </div>
    );
}

export default App;
