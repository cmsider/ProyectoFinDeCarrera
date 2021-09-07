import React from "react";
import Contenedor from "../menuNavegacion/Contenedor";
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { MessageBox } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements';

import { ChatItem } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';
import { Popup } from 'react-chat-elements';



export const HistorialEnvios = () => {
  return (
    <div>
      <ChatItem
    avatar={'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'}
    alt={'Reactjs'}
    title={'Facebook'}
    subtitle={'What are you doing?'}
    date={new Date()}
    unread={0} />
     <MessageList
    className='message-list'
    lockable={true}
    toBottomHeight={'100%'}
    dataSource={[
        {
            position: 'right',
            type: 'text',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
            date: new Date(),
        },
        {
          position: 'left',
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
          date: new Date(),
      },
    ]} />

    
<Input
    placeholder="Type here..."
    multiline={true}
    rightButtons={
        <Button
            color='white'
            backgroundColor='black'
            text='Send'/>
    }/>


    </div>
  );
};
export default HistorialEnvios;






/*


export const HistorialEnvios = () => {
  return (
    <div>
      <Contenedor/>
      <h1>Historico envios</h1>
    </div>
  );
};
export default HistorialEnvios;







import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";


export const HistorialEnvios = () => {
    return (
        <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "12:41:57 AM",
                  sender: "Joe",
                }}
              />
            </MessageList>
            <MessageInput placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
    );
};export default HistorialEnvios;








*/