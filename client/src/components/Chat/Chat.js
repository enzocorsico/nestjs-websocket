import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Chat.css";

const socket = io("http://localhost:8080");

const Chat = () => {
    const params = useParams();
    const [chatId] = useState(parseInt(params.id));
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [dateNow, setDateNow] = useState(new Date().getTime());

    // Envoie d'un message
    const sendMessage = () => {
        let message = document.getElementById("messageInput")?.value;
        if (message) {
            socket.emit("createMessage", {
                contenu: message,
                chatId: chatId
            });
        }
    }

    // Permet de récupérer les informations du chat
    const getChat = (id) => {
        axios.get("http://localhost:8080/chat/" + id).then((response) => {
            setChat(response.data);
            setMessages(response.data.messages);
        })
    }

    const getTimeInterval = (dateString) => {
        let dateMessage = new Date(dateString).getTime();
        let secondes = Math.round(dateNow / 1000 - dateMessage / 1000);
        let minutes = Math.round(secondes / 60);
        let heures = Math.round(minutes / 60);

        if (heures > 24) {
            return new Date(dateNow).toLocaleDateString();
        } else if (heures !== 0 && heures < 24) {
            return "Il y a " + heures + "h";
        } else if (minutes !== 0 && minutes < 60) {
            return "Il y a " + minutes + "min";
        } else if (secondes !== 0 && secondes < 60) {
            return "Il y a " + secondes + "sec";
        } else {
            return "A l'instant";
        }
    }

    useEffect(() => {
        getChat(chatId);

        setInterval(() => {
            setDateNow(new Date().getTime())
        }, 1000);

        // Réception d'un message
        socket.on("newMessage", (newMessage) => {
            setMessages(currentMessages => [...currentMessages, newMessage]);
        })

        return () => {
            // Important de fermer la connexion pour récupérer les nouveaux messages parce que sinon on les récupére en double
            socket.off("newMessage");
        }
    }, [chatId])

    return (
        <div className="Chat-div">
            <p>Nom du chat : { chat.nom }</p>
            <ul>
                { messages.map((message) => (
                    <li key={ message.id }>
                        <h3>{ message.contenu }</h3>
                        {/* <small> à { formatDate(message.dateCreation) }</small> */}
                        ({ getTimeInterval(message.dateCreation) })
                    </li>
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