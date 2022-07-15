import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:8080");

const Chat = () => {
    const params = useParams();
    const [chatId] = useState(parseInt(params.id));
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        let message = document.getElementById("messageInput")?.value;
        if (message) {
            socket.emit("createMessage", {
                contenu: message,
                chatId: chatId
            });
        }
    }

    useEffect(() => {
        socket.emit("findAllMessage", (data) => {
            setMessages(data);
        })
    
        socket.on("newMessage", (message) => {
            setMessages(messages => [...messages, message]);
        })
    }, [messages])

    return (
        <div>
            <p>Page Chat n°{ chatId }</p>
            <ul>
                { messages.map((message) => (
                    <li key={ message.id }>{ message.contenu }</li>
                )) }
            </ul>

            <div>
                <input id="messageInput" type={ "text" } />
                <button type="button" onClick={ sendMessage }>Envoyer</button>
            </div>
        </div>
    );
};

export default Chat;