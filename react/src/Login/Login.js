import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import API from '../API/API';
import SingupAlert from '../SignupAlert/SignupAlert'
import logo from '../logo.svg';
import './Login.css';

const Login = (props) => {
    const [alert, setAlert] = useState("null");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const switchToChatroomWindow = (id) => {
        props.setID(id);
        props.setPage("chatroom");
    }

    const checkTokenData = async (token) => {
        let userId = await axios.get(API.API_URL + '/api/token_data', { params: { token: token } });
        return userId.data.id;
    }

    const checkToken = async () => {
        let token = window.localStorage.getItem('token');
        if (token === null){
            console.log("GETTING NEW TOKEN AND LOG IN INFO"); 
        }
        else {
            let tokenData = await checkTokenData(token); 
            if (tokenData !== -1){
                console.log("TOKEN IN SESSION");
                switchToChatroomWindow(tokenData);  
            } 
            else {
                console.log("TOKEN EXPIRED");
            }
        } 
    }

    React.useEffect(() => {
        checkToken();
    });

    const buttonClickHandler = async () => {
        console.log("Clicked");

        let usernameResponse = await axios.get(API.API_URL + '/api/user_exist', { params: { user_name: username } });
        if (! usernameResponse.data.exist) {
            setAlert("user-not-exist");
        } 
        else {
            let passwordResponse = await axios.get(API.API_URL + '/api/login', { params: { user_name: username, user_password: password } });
            if (! passwordResponse.data.success) {
                setAlert("password-wrong");
            }
            else {
                setAlert("null");
                let id = passwordResponse.data.user_id;
                let token = passwordResponse.data.token; 
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
                <Form className="Login-Form">
                    <SingupAlert alert={alert} />
                    <Form.Group>
                        <Form.Control className="Login-Form-Text" onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Enter Username" />
                        <Form.Control className="Login-Form-Text" onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <Button onClick={buttonClickHandler} className="Login-Form-Button" variant="outline-success">
                        Sign In
                    </Button>
                    <Button onClick={() => {props.setPage("createAccount")}} className="Login-Form-Button" variant="outline-success">
                        Create Account
                    </Button>
                </Form>
            </header>
        </div>
    );
};

export default Login;