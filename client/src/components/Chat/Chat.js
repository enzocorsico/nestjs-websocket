import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:8080");

const Chat = () => {
    const params = useParams();
    const [chatId] = useState(parseInt(params.id));
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);

    const getMessages = (id) => {
        axios.get("http://localhost:8080/chat/" + id)
            .then((res) => {
                setMessages(res.data.messages);
            })
    }

    const sendMessage = () => {
        let message = document.getElementById("inputMessage")?.value;
        if (message) {
            socket.emit("createMessage", {
                contenu: message,
                chatId: chatId
            });
        }
    }

    useEffect(() => {
        getMessages(chatId);

        socket.on("connect", () => {
            setIsConnected(true);
        })

        socket.on("disconnect", () => {
            setIsConnected(false);
        })

        socket.on("message", (data) => {
            // TODO: Problème lorsqu'on reçois un message pour l'ajouter à la liste des messages déjà existant
            // setMessages(messages.push(data));
        })

    }, [chatId])

    return (
        <div>
            <p>Page Chat n°{ chatId }</p>
            <ul>
                { messages.map((message) => (
                    <li key={ message.id }>{ message.contenu }</li>
                )) }
            </ul>

            <div>
                <input id="inputMessage" type={ "text" } />
                <button type="submit" onClick={ sendMessage }>Envoyer</button>
            </div>
        </div>
    );
};

export default Chat;