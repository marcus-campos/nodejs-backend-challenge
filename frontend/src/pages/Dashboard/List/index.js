import React, { useState } from "react";

import { Container, ListItem, ColorIdentifier, Info, Name, ActionButtons } from "./styles";
import GuestModal from "./../../../components/GuestModal"

export default function List({rooms}) {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  const handleClickOpen = (roomId) => {
    setRoomId(roomId)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      {rooms.map(room => (
        <ListItem key={room.id} onClick={() => handleClickOpen(room.id)}>
          <ColorIdentifier color={"#ED659A"} />
          <Info>
            <Name>{room.name}</Name>
            <ActionButtons></ActionButtons>
          </Info>
        </ListItem>
      ))}
      <GuestModal open={open} handleClose={handleClose} roomId={roomId}/>
    </Container>
  );
}
