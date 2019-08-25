import React, { useState }  from 'react';
import './App.css';

import Login from './Login/Login'

function App() {
    const [page, setPage] = useState("login");

    const getPageHandler = () => {
        switch (page) {
            case "login":
                return <Login></Login>
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
