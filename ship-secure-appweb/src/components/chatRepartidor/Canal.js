import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import TextFiled from "@material-ui/core/TextField";

const Canal = ({ user = null, db = null}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage]= useState('');
    const {uid, displayName, photoURL} = user;
    useEffect(() => {
        if (db) {
            console.log("llega");

            const unsubscribe = db
            .collection('messages')
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot(querySnapshot =>{
                const data = querySnapshot.docs.map(doc =>({
                    ...doc.data(),
                    id: doc.id,
                }));
                setMessages(data);
                console.log(data);
            });

            return unsubscribe;
        }
    }, [db]);

    const handleOnChange = e =>{
        setNewMessage(e.target.value);
    };

    const handleOnSubmit = e =>{
        e.preventDefault();
        if(db){
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
                
            })
        }
    }
  

    return (
        <>
        <ul>
            {messages.map(message =>(
                <li key={message.id}>{message.text}
                </li>
                
            ))}
        </ul>
        
        <form onSubmit = {handleOnSubmit}>
        <TextFiled
            type= "text"
            value= {newMessage}
            onChange ={handleOnChange}
            placeholder="Escriba su mensaje aqui"
            />
            <Button type = "submit" disabled={!newMessage}>
                Enviar
            </Button>
        </form>
    
        </>
    );
};
export default Canal;
