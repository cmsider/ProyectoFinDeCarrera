import React, { useState, useEffect } from "react";
import { Button } from "react-chat-elements";
import firebase from "firebase/app";
import TextFiled from "@material-ui/core/TextField";
import Contenedor from "../menuNavegacion/Contenedor";
import { db, auth } from "../firebase";
import ChatBubble from "react-chat-bubble";
import GifChat from "./GifChat";
import { Input } from "react-chat-elements";
import { ChatItem } from "react-chat-elements";
import { MessageList } from 'react-chat-elements';

import { SideBar } from 'react-chat-elements'


import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Card,
  CardContent,
  List,
  ListItem,
  Box,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: "linear-gradient(45deg, #003648 50%, #08AFA5 90%)",
    margin: theme.spacing(3, 0, 2),
    color: "#FFFFFF",
  },

  contenedor: {
    marginTop : "80px",
    width:  "650px",
    display: "block",

  },

}));

const Canal = () => {
  const classes = useStyles();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState([]);
  var myJson = JSON.parse(localStorage.getItem("usuarios"));

  useEffect(() => {
    const consultaAPI = async () => {
      db.collection("usuarios")
        .where("email", "==", myJson["email"])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            const usuario = [];
            usuario.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
            setUser(usuario);
          });
        });
    };
    consultaAPI();
  }, []);

  useEffect(() => {
    if (db) {
      console.log("llega");

      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
         // var myJson2 = JSON.parse(data);
          //console.log(myJson2["email"]);
          console.log(data[0]);


        });

      return unsubscribe;
    }
  }, [db]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user,
      });
    }
  };

  return (
    <>
   
<Contenedor/>
      <Container component="main" maxWidth="lg" className={classes.contenedor}>
 
        <CssBaseline />
        
         
        <ChatItem
          avatar={
            "https://i.ibb.co/jGwMwn4/Microsoft-Teams-image.png"
          }
          alt={"Reactjs"}
          title={"Repartidor"}
          subtitle={"Desde ShipSecure"}
          date={""}
          unread={0}
          titleColor	 = "#003648"
        />


  <Box   overflow="auto" bgcolor="#08AFA5"  height = "600px"
>

        <ul>
        
        {messages.map((message) => (
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}

            key={message.id}
            dataSource={[
              message.user[0].email== myJson["email"]?
              {
                position: "right",
                type: "text",
                text: message.text,
                date: message.createdAt? new Date(message.createdAt.toDate()):new Date(),
              }:
              {
                position: "left",
                type: "text",
                text: message.text,
                date: message.createdAt? new Date(message.createdAt.toDate()):new Date(),
              }
              
            
            ]}
          />
          ))}

        </ul>
       
        </Box>

        <form onSubmit={handleOnSubmit}>

              <Input
                placeholder="Escribe aqui..."
                multiline={true}
                onChange={handleOnChange}
                rightButtons={
                  <Button
                    type="submit"
                    color="#FFFFFF"
                    backgroundColor="#003648"
                    text="Enviar"
                    disabled={!newMessage}
                  />
                }
              />

        </form>

      </Container>

    </>
  );
};
export default Canal;

