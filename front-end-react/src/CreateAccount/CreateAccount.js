import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import logo from '../logo.svg';
import './CreateAccount.css';

const createAccount = (props) => {
    let status = "null";

    const SingupAlert = (props) => {
        if (props.status === "null") 
            return null;
        return (
            <Alert className="Signup-Form-Alert" key={0} variant={'danger'}>
                Username Exist!
            </Alert>
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Form className="Signup-Form">
                    <SingupAlert status={status}/>
                    <Form.Group>
                        <Form.Control className="Signup-Form-Text" type="text" placeholder="Enter Username" />
                        <Form.Control className="Signup-Form-Text" type="password" placeholder="Enter Password" />
                        <Form.Control className="Signup-Form-Text" type="password" placeholder="Confirm Password" />
                        <Form.Control className="Signup-Form-Text" type="email" placeholder="Enter E-Mail" />
                    </Form.Group>
                    <Button className="Signup-Form-Button" variant="outline-success">
                        Sign Up
                    </Button>
                    <p>Have an account? Sign In</p>
                </Form>
            </header>
        </div>
    );
};

export default createAccount;