import React from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

import API from '../API/API';
import './SignupAlert.css';

const SingupAlert = props => {
    if (props.alert === "null")
        return null;

    let errorMessage = "";
    switch (props.alert) {
        case "user-exist":
            errorMessage = "The username is taken!";
            break; 
        case "username-format":
            errorMessage = "Username should be 1 to 10 characters of letter and number combination!";
            break; 
        case "password-not-match":
            errorMessage = "Please enter the same password again!";
            break; 
        case "password-format":
            errorMessage = "Username should be 5 to 15 characters of letter and number combination!";
            break; 
        case "email-format":
            errorMessage = "Please enter the email with correct format!";
            break; 
    }

    return (
        <Alert className="Signup-Form-Alert" key={0} variant={'danger'}>
            {errorMessage}
        </Alert>
    );
};

export default SingupAlert;