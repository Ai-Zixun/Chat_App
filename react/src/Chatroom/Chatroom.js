import React, { useState, useEffect } from 'react';
import { Row, Col, Container, InputGroup, FormControl, Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import API from '../API/API';
import CreateChatroom from '../CreateChatroom/CreateChatroom';
import './Chatroom.css';

const Chatroom = props => {
    // Something Must be wrong here, I shouldn't need to do this. 
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    //////////////////////////////////////////////////////////////////


    // ------ CHATROOM TAGS ------
    const [text, setText] = useState("");
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [createChatrooModalShow, setCreateChatroomModalShow] = React.useState(false);

    const loadUsername = () => {
        axios.get(API.API_URL + '/api/user_by_id', { params: { user_id: props.id } }).then(response => {
            setUsername(response.data.username);
            console.log(username);
        });
    }

    const appendMessages = (newMessage) => {
        let temp = messages;
        temp.push(newMessage);
        setMessages(temp); 
    }

    useEffect(async () => {
        await loadUsername();
        axios.get(API.API_URL + '/api/chatroom_list').then(response => {
            let room = response.data[0];
            setRooms(response.data);
            axios.get(API.API_URL + '/api/chatroom_messages', { params: { chatroom_id: room.chatroom_id } }).then(response => {
                setMessages(response.data);
            });
        });
    }, []);

    props.socket.on('server_message', (data) => {
        console.log("Receive Socket DATA");
        /*
        console.log(data);
        console.log(data.type == 'message');
        console.log(data.chatroom_id);
        console.log(rooms);// Issue 
        let currentRoom = rooms[0];
        //console.log(currentRoom.chatroom_id);// Issue 
        console.log(messages);
        if (data.type == 'message' && data.chatroom_id == rooms[0].chatroom_id){
            console.log("true")
            
            newMessage.push({
                user_name: data.user_name,
                message: data.message,
                created_date: null
            });
            
        }
    
        */
    })

    const roomClickHandler = (chatroom_id) => {
        let modifiedRooms = rooms;
        let index = -1;
        for (let i = 0; i < modifiedRooms.length; i++) {
            if (rooms[i].chatroom_id === chatroom_id) {
                index = i;
            }
        }
        modifiedRooms.splice(0, 0, modifiedRooms.splice(index, 1)[0]);
        axios.get(API.API_URL + '/api/chatroom_messages', { params: { chatroom_id: modifiedRooms[0].chatroom_id } }).then(response => {
            setMessages(response.data)
        });
        setRooms(modifiedRooms);
        forceUpdate();
    };

    const displayRoomList = () => {
        if (rooms.length >= 1) {
            let result = [];
            result.push(
                <div>
                    <p className="TagSelected" onClick={() => roomClickHandler(rooms[0].chatroom_id)}>{rooms[0].chatroom_name}</p>
                    <hr />
                </div>
            );
            let nonCurrentRooms = rooms.slice(1, rooms.length);
            nonCurrentRooms.forEach((room) => {
                result.push(
                    <div>
                        <p className="Tag" onClick={() => roomClickHandler(room.chatroom_id)}>{room.chatroom_name}</p>
                        <hr />
                    </div>
                );
            });
            return result;
        }
    };

    const chatroomTags = () => {
        return (
            <div className="ChatroomTag">
                <hr />
                {displayRoomList()}
            </div>
        );
    };

    const getCurrentRoom = () => {
        if (rooms.length === 0) {
            return null;
        }
        else {
            return rooms[0].chatroom_name;
        }
    }

    const sendMessageHandler = (event) => {
        event.preventDefault();
        props.socket.emit('client_message', {
            type: 'message',
            user_id: props.id,
            user_name: username,
            chatroom_id: rooms[0].chatroom_id,
            message: text
        })
        setText('');
    }

    // ------ CHATROOM BOX ------
    const displayMessageList = () => {
        let result = [];
        messages.forEach((message) => {
            if (message.user_name === username) {
                result.push(
                    <div className="FromUser">
                        <div>
                            <span className="MessageUser">{message.user_name}</span>
                            <span className="MessageDate">{message.created_date}</span>
                        </div>
                        <div>
                            <span className="MessageTextUser">{message.message}</span>
                        </div>
                    </div>
                );
            }
            else {
                result.push(
                    <div>
                        <div>
                            <span className="MessageUser">{message.user_name}</span>
                            <span className="MessageDate">{message.created_date}</span>
                        </div>
                        <div>
                            <span className="MessageTextOther">{message.message}</span>
                        </div>
                    </div>
                );
            }
        });
        return result;
    }

    // ------ RETURN ------
    return (
        <div className="Chatroom">
            <Container>
                <Row className="Top">
                    <Col xs={4} className="TopLeft">
                        <p className="TopLeftText">Chatrooms</p>
                    </Col>
                    <Col xs={2} className="TopRightEmpty">
                    </Col>
                    <Col xs={4} className="TopRightLabel">
                        <p className="TopRightText">{getCurrentRoom()}</p>
                    </Col>
                    <Col xs={2} className="TopRightRight">
                        <p className="TopRightSignedIn">Signed in as: {username}</p>
                        <Button className="TopRightButton" variant="light">Sign out</Button>
                    </Col>
                </Row>
                <Row className="Bottom">
                    <Col xs={4} className="BottomLeft">
                        {chatroomTags()}
                        <ButtonToolbar>
                            <Button variant="outline-success" onClick={() => setCreateChatroomModalShow(true)}>
                                New Chatroom
                            </Button>
                            <CreateChatroom setRoom={roomClickHandler} show={createChatrooModalShow} onHide={() => setCreateChatroomModalShow(false)}/>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={8} className="BottomRight">
                        <div className="Textbox" id="DisplayedMessage">
                            {displayMessageList()}
                        </div>
                        <div className="TextInput">
                            <InputGroup className="mb-3 Input">
                                <FormControl
                                    className="Input"
                                    placeholder="Message"
                                    aria-describedby="basic-addon2"
                                    value={text}
                                    onChange={(event) => {setText(event.target.value);}}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-success" onClick={sendMessageHandler}>Send</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Chatroom;