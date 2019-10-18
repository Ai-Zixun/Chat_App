import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import API from '../API/API';
import validator from 'validator'; 
import SingupAlert from '../SignupAlert/SignupAlert'
import logo from '../logo.svg';
import './CreateAccount.css';

const CreateAccount = props => {
    const [alert, setAlert] = useState("null");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordReenter, setPasswordReenter] = useState('');
    const [email, setEmail] = useState('');

    const buttonClickHandler = async () => {
        console.log("Clicked");
        
        let usernameResponse = await axios.get(API.API_URL + '/api/user_exist', { params: { user_name: username } });
        if (!validator.matches(username, /^[a-zA-Z0-9]{1,10}$/)) {
            setAlert("username-format"); 
        } 
        else if (usernameResponse.data.exist) {
            setAlert("user-exist");
        } 
        else if (!validator.matches(password, /^[a-zA-Z0-9]{5,15}$/)) {
            setAlert("password-format"); 
        } 
        else if (passwordReenter !== password) {
            setAlert("password-not-match"); 
        } 
        else if (!validator.isEmail(email)) {
            setAlert("email-format"); 
        } 
        else {
            let createResponse = await axios.get(API.API_URL + '/api/create_user', { params: { user_name: username, user_password: password  } });
            if (! createResponse.data.success) {
                setAlert("syste-error");
            }
            else {
                setAlert("null");
                let id = createResponse.data.user_id;
                let token = createResponse.data.token; 
                window.localStorage.setItem('id', id);
                window.localStorage.setItem('token', token.substring(2, token.length - 1));
                props.setID(id);
                props.setPage("chatroom"); 
            }
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Form className="Signup-Form">
                    <SingupAlert alert={alert} />
                    <Form.Group>
                        <Form.Control className="Signup-Form-Text" onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Enter Username"/>
                        <Form.Control className="Signup-Form-Text" onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" />
                        <Form.Control className="Signup-Form-Text" onChange={(event) => setPasswordReenter(event.target.value)} type="password" placeholder="Confirm Password" />
                        <Form.Control className="Signup-Form-Text" onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter E-Mail" />
                    </Form.Group>
                    <Button onClick={buttonClickHandler} className="Signup-Form-Button" variant="outline-success">
                        Sign Up
                    </Button>
                    <p className="Text">Have an account? <a id={"Link"} onClick={() => {props.setPage("login")}}>Sign In</a></p>
                </Form>
            </header>
        </div>
    );
};

export default CreateAccount;