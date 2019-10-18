import React, { useState, useEffect } from 'react';
import { Row, Col, Container, InputGroup, FormControl, Button, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import API from '../API/API';
import CreateChatroom from '../CreateChatroom/CreateChatroom';
import './Chatroom.css';

const Chatroom = props => {
    // ------ CHATROOM TAGS ------
    const [text, setText] = useState("");
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(1);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [createChatrooModalShow, setCreateChatroomModalShow] = useState(false);

    useEffect(() => {
        axios.get(API.API_URL + '/api/user_by_id', { params: { user_id: props.id } }).then(response => {
            setUsername(response.data.username);
        });

        axios.get(API.API_URL + '/api/chatroom_list').then(response => {
            setRooms(response.data);  
        });

        axios.get(API.API_URL + '/api/chatroom_messages_all').then(async response => {
            setMessages(response.data);
        });

        props.socket.on('connect', () => {
            props.socket.emit('client_transmission', {
                connection: 'Connection Estublished'
            })
        })

        props.socket.on('server_update', (data) => {
            setMessages(JSON.parse(data));
        })

        props.socket.on('chatroom_list_update_server', (data) => {
            setRooms(JSON.parse(data));
        })
    }, [props.id, props.socket]);


    const roomClickHandler = (chatroom_id) => {
        setCurrentRoom(chatroom_id);
    };

    const newRoomHandler = (chatroom_id) => {
        props.socket.emit('chatroom_list_update', {
            type: 'chatroom_list_update'
        })
        setCurrentRoom(chatroom_id);
    }; 

    const displayRoomList = () => {
        if (rooms.length >= 1) {
            let result = [];
            rooms.forEach((room) => {
                if (room.chatroom_id === currentRoom) {
                    result.push(
                        <div>
                            <p className="TagSelected" onClick={() => roomClickHandler(room.chatroom_id)}>{room.chatroom_name}</p>
                            <hr />
                        </div>
                    );
                }
                else {
                    result.push(
                        <div>
                            <p className="Tag" onClick={() => roomClickHandler(room.chatroom_id)}>{room.chatroom_name}</p>
                            <hr />
                        </div>
                    );
                }
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
            let result = "";
            rooms.forEach((room) => {
                if (room.chatroom_id === currentRoom){
                    result = room.chatroom_name;
                }
            }); 
            return result;
        }
    }

    const sendMessageHandler = (event) => {
        event.preventDefault();
        props.socket.emit('client_message', {
            type: 'message',
            user_id: props.id,
            token: window.localStorage.getItem('token'), 
            user_name: username,
            chatroom_id: currentRoom,
            message: text
        })
        setText('');
    }

    const formatCreatedDate = (createdDate) => {
        return createdDate.substring(0, 16); 
    }

    // ------ CHATROOM BOX ------
    const displayMessageList = () => {
        if (rooms[0] === undefined) return null; 
        let chatroomId = currentRoom; 
        let result = [];
        messages.forEach((message) => {
            if (message.chatroom_id === chatroomId) {
                if ( message.user_name === username) {
                    result.push(
                        <div className="FromUser">
                            <div>
                                <span className="MessageDate">{formatCreatedDate(message.created_date)}</span>
                                <span className="MessageUser">{message.user_name}</span>                                
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
                                <span className="MessageDate">{formatCreatedDate(message.created_date)}</span>
                            </div>
                            <div>
                                <span className="MessageTextOther">{message.message}</span>
                            </div>
                        </div>
                    );
                }
            }
        });
        return result;
    }

    const signOutHandler = () => {
        props.setPage("login");
        window.localStorage.setItem('token', null);
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
                        <Button className="TopRightButton" variant="light" onClick={signOutHandler}>Sign out</Button>
                    </Col>
                </Row>
                <Row className="Bottom">
                    <Col xs={4} className="BottomLeft">
                        {chatroomTags()}
                        <ButtonToolbar>
                            <Button variant="outline-success" onClick={() => setCreateChatroomModalShow(true)}>
                                New Chatroom
                            </Button>
                            <CreateChatroom setRoom={newRoomHandler} show={createChatrooModalShow} onHide={() => setCreateChatroomModalShow(false)} />
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
                                    onChange={(event) => { setText(event.target.value); }}
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