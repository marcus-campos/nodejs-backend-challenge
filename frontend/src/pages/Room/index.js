import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import api from './../../services/api'
import io from 'socket.io-client';
import { TextField, Button } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import Modal from '../../components/Modal'
import { Container, Content, MessageBox, Author, Message, InputMessage } from './styles';

export default function Room() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [txtMessage, setTxtMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [modalFormData, setModalFormData] = useState({
    name: '',
    nick: '',
    email: '',
    birth: ''
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const {name, birth, nick, email} = modalFormData;
    if(name && birth && nick && email){
      const result = await api.post('/users', modalFormData);
      if(result.status === 200){
        localStorage.setItem('@multiplan_type', 'member');
        localStorage.setItem('@multiplan_userId', result.data.id);
        setModalFormData({
          name: '',
          nick: '',
          email: '',
          birth: ''
        });
        setOpen(false);
      }
    } else {

    }
  }

  const sendMessage = async () => {
    const socket = io(`localhost:3001/room-${id}`)
    const userType = localStorage.getItem('@multiplan_type');
    if(userType === 'guest') {
      setOpen(true);
    } else{
      const userId = await localStorage.getItem('@multiplan_userId');
      const roomId = id;
      if(txtMessage.length){
        const result = await api.post('/messages', {
          userId,
          roomId,
          message: txtMessage
        });
        if(result.status === 200){
          socket.emit('message', result.data)
          setTxtMessage("")
        }
      }
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const fetchMessages = async() => {
      const result = await api.get(`/messages/rooms/${id}`)
      if(result.status === 200){
        setMessages(result.data);
      }
    }
    fetchMessages();
  }, [id])

  useEffect(() => {
    const listenSocket = () => {
    const socket = io(`localhost:3001/room-${id}`)
      socket.on('message', message => {
        console.log(message)
        setMessages( messages => [...messages, message] )
        scrollToBottom();
      })
    }
    listenSocket();
  }, [id])

  return (
    <Container>
      <Modal 
        title="Finalize seu cadastro" 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit}>
        <DialogContentText>
          Para enviar uma mensagem é necessário finalizar seu cadastro.
        </DialogContentText>
        <DialogContentText>
          Para enviar uma mensagem é necessário finalizar seu cadastro.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          value={modalFormData.name}
          onChange={e => {
            setModalFormData({
              ...modalFormData,
              name: e.target.value
            })
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="nick"
          label="Apelido"
          type="text"
          fullWidth
          value={modalFormData.nick}
          onChange={e => {
            setModalFormData({
              ...modalFormData,
              nick: e.target.value
            })
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="text"
          fullWidth
          value={modalFormData.email}
          onChange={e => {
            setModalFormData({
              ...modalFormData,
              email: e.target.value
            })
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="birht"
          label="Data de nascimento"
          type="text"
          fullWidth
          value={modalFormData.birth}
          onChange={e => {
            setModalFormData({
              ...modalFormData,
              birth: e.target.value
            })
          }}
        />
      </Modal>
      <Content>
        {
          messages.length && (
            messages.map((message, index) => (
              <MessageBox key={index}>
                <Author>{message.user ? message.user.name : 'anonymous'} -</Author>
                <Message>{message.message}</Message>
              </MessageBox>
            ))
          )
        }
        <div ref={messagesEndRef}/>
      </Content>  
      <InputMessage>
          <TextField
            autoFocus
            margin="dense"
            id="nick"
            label="Mensagem"
            type="text"
            variant="filled"
            fullWidth
            value={txtMessage}
            style={{flex: 5}}
            onChange={e => setTxtMessage(e.target.value)}
          />
          <Button 
            style={{flex: 1, marginLeft: 16}}
            variant="contained" 
            color="primary" 
            onClick={sendMessage}>
            Enviar
          </Button>
        </InputMessage>
    </Container>
  );
}
