import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import '../style/Chat.css';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';
import UserList from './UserList';

let socket;

function Chat({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    const ENDPOINT = 'https://react-chat-app-tutorial.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, { transports : ['websocket'] });

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.disconnect();
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    useEffect(() => {
        socket.on('roomData', (payload) => {
            if(payload.room === room.trim().toLowerCase()) {
                setUsers(payload.users);
            }
        })
    }, [users, room]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <UserList users={users} />
        </div>
    )
}

export default Chat
