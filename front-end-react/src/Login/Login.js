import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../logo.svg';
import './Login.css';

const login = (props) => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Form className="Login-Form">
                    <Form.Group>
                        <Form.Control className="Login-Form-Text" type="text" placeholder="Enter Username" />
                        <Form.Control className="Login-Form-Text" type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <Button className="Login-Form-Button" variant="outline-success">
                        Sign In
                    </Button>
                    <Button className="Login-Form-Button" variant="outline-success">
                        Create Account
                    </Button>
                </Form>
            </header>
        </div>
    );
};

export default login;