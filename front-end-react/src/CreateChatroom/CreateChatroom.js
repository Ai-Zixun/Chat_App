import { Alert, Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import validator from 'validator'; 
import axios from 'axios';
import API from '../API/API';

const CreateChatroom = (props) => {

    let roomname = ""; 
    const [errorMessage, setErrorMessage] = useState("");

    const roomnameExist = async (roomname) => {
        let roomnameResponse = await axios.get(API.API_URL + '/api/chatroom_roomname_exist', { params: { roomname: roomname } });
        return roomnameResponse.data.exist;
    }

    const createRoom = async (setRoom) => {
        if (!validator.matches(roomname, /^[a-zA-Z0-9]{1,10}$/)) {
            setErrorMessage("Illegal Chatroom Name: Please use 1 to 10 characters of letter and number combination!"); 
        } 
        else if (await roomnameExist(roomname)) {
            setErrorMessage("Illegal Chatroom Name: The chatroom name has been taken!"); 
        } 
        else {
            let createRoomResponse = await axios.get(API.API_URL + '/api/chatroom_create', { params: { roomname: roomname } });
            let chatroomId = createRoomResponse.data.chatroom_id; 
            console.log(chatroomId);
            setRoom(chatroomId);
            setErrorMessage(""); 
        }
    }

    const createRoomAlert = () => {
        if (errorMessage === ""){
            return null;
        }
        else {
            return (
                <Alert variant="danger">
                    {errorMessage}
                </Alert>
            ); 
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Chatroom
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Chatroom Name" onChange={(event) => {roomname = event.target.value;}}/>
                    </Form.Group>
                    <Form.Group>
                        {createRoomAlert()}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {createRoom(props.setRoom); props.onHide();}}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateChatroom;