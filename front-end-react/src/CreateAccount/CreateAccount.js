import React, { useState, createRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import SingupAlert from '../SignupAlert/SignupAlert'
import logo from '../logo.svg';
import './CreateAccount.css';

const CreateAccount = props => {
    const [alert, setAlert] = useState("null");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordReenter, setPasswordReenter] = useState('');
    const [email, setEmail] = useState('');

    const buttonClickHandler = () => {
        console.log(username)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Form className="Signup-Form">
                    <SingupAlert alert={alert} />
                    <Form.Group>
                        <Form.Control className="Signup-Form-Text" onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Enter Username"/>
                        <Form.Control className="Signup-Form-Text" type="password" placeholder="Enter Password" />
                        <Form.Control className="Signup-Form-Text" type="password" placeholder="Confirm Password" />
                        <Form.Control className="Signup-Form-Text" type="email" placeholder="Enter E-Mail" />
                    </Form.Group>
                    <Button onClick={() => {buttonClickHandler()}} className="Signup-Form-Button" variant="outline-success">
                        Sign Up
                    </Button>
                    <p>Have an account? Sign In</p>
                </Form>
            </header>
        </div>
    );
};

export default CreateAccount;