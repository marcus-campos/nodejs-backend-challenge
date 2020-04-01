import React, { useState, useEffect } from "react";
import api from '../../../services/api'
import { useHistory } from "react-router-dom";
import DialogContentText from "@material-ui/core/DialogContentText";
import io from "socket.io-client";
import { TextField, Button } from "@material-ui/core";

import {
  Container,
  ListItem,
  ColorIdentifier,
  Info,
  Name,
  ActionButtons
} from "./styles";
import Modal from "./../../../components/Modal";

export default function List() {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [hasLocalStorage, setHasLocalStorage] = useState(false);
  const history = useHistory();
  const socket = io(`localhost:3001/room-${roomId}`);

  const handleClickOpen = roomId => {
    setRoomId(roomId);
    if(hasLocalStorage){
      history.push(`/room/${roomId}`);
    } else {
      setOpen(true);
    }
    
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCreateModal(false);
  };

  const handleSubmit = () => {
    socket.emit("join", { name, type: "guest", room: roomId });
    localStorage.setItem("@multiplan_username", name);
    localStorage.setItem("@multiplan_type", "guest");
    history.push(`/room/${roomId}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setHasLocalStorage(false);
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  const handleSubmitCreateModal = async () => {
    const socket = io(`localhost:3001/`)
    const result = await api.post('/rooms', {
      name: roomName
    })
    if(result.status === 200){
      setRooms([
        ...rooms,
        result.data
      ])
      console.log("HERE))))")
      socket.emit('create-room')
      handleClose()
    }
  }

  const verifyHasLocalStorage = () => (
      localStorage.getItem("@multiplan_username")
        ? setHasLocalStorage(true)
        : setHasLocalStorage(false)
    );

  useEffect(() => {
    const fetchRooms = async () => {
      const result = await api.get("/rooms");
      if (result.status === 200) {
        setRooms(result.data);
        setOpenCreateModal(false);
      }
    };
    verifyHasLocalStorage();
    fetchRooms();
  }, []);

  return (
    <Container>
      {hasLocalStorage && (
        <Button
          style={{ flex: 1, marginLeft: 16 }}
          variant="contained"
          onClick={handleLogout}
        >
          Deslogar
        </Button>
      )}
      <Button
          style={{ flex: 1, marginLeft: 16 }}
          variant="contained"
          onClick={handleCreate}
          color="primary"
        >
          Criar Sala
        </Button>
      {rooms.map(room => (
        <ListItem key={room.id} onClick={() => handleClickOpen(room.id)}>
          <ColorIdentifier color={"#00ff00"} />
          <Info>
            <Name>{room.name}</Name>
            <ActionButtons></ActionButtons>
          </Info>
        </ListItem>
      ))}
      <Modal
        title="Entrar como convidado"
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      >
        <DialogContentText>
          Para entrar em uma sala, primeiro me informe um apelido
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="nick"
          label="Apelido"
          type="text"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Modal>

      <Modal
        title="Criar sala"
        open={openCreateModal}
        handleClose={handleClose}
        handleSubmit={handleSubmitCreateModal}
      >
        <DialogContentText>Crie uma sala</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="roomName"
          label="Nome da sala"
          type="text"
          fullWidth
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
      </Modal>
    </Container>
  );
}
