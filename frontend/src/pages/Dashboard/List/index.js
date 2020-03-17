import React from "react";

import { Container, ListItem, ColorIdentifier, Info, Name, ActionButtons } from "./styles";

export default function List({rooms}) {
  return (
    <Container>
      {rooms.map(room => (
        <ListItem key={room.id}>
          <ColorIdentifier color={"#ED659A"} />
          <Info>
            <Name>{room.name}</Name>
            <ActionButtons></ActionButtons>
          </Info>
        </ListItem>
      ))}
    </Container>
  );
}
