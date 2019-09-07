import React from 'react';
import { Alert } from 'react-bootstrap';

import './SignupAlert.css';

const SingupAlert = props => {
    if (props.alert === "null")
        return null;

    let errorMessage = "";
    switch (props.alert) {
        case "user-exist":
            errorMessage = "The username is taken!";
            break; 
        case "user-not-exist":
            errorMessage = "The user does not exist!";
            break; 
        case "username-format":
            errorMessage = "Username should be 1 to 10 characters of letter and number combination!";
            break; 
        case "password-not-match":
            errorMessage = "Please enter the same password again!";
            break; 
        case "password-format":
            errorMessage = "Password should be 5 to 15 characters of letter and number combination!";
            break; 
        case "password-wrong":
            errorMessage = "Incorrect Password!";
            break; 
        case "email-format":
            errorMessage = "Please enter the email with correct format!";
            break; 
        case "syste-error":
            errorMessage = "Sorry, We are trying to fix our server";
            break; 
    }

    return (
        <Alert className="Signup-Form-Alert" key={0} variant={'danger'}>
            {errorMessage}
        </Alert>
    );
};

export default SingupAlert;