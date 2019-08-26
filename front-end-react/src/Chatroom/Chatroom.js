import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from '../logo.svg';

const Chatroom = props => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Form className="Signup-Form">
                    <Button className="Signup-Form-Button" variant="outline-success">
                        ROOOOOOM
                    </Button>
                    <p className="Text">Have an account?</p>
                </Form>
            </header>
        </div>
    );
};

export default Chatroom;