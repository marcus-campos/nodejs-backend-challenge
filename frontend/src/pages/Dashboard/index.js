import React from "react";
import List from './List'
import { Container, Content } from "./styles";

export default function Dashboard() {
  return (
    <Container>
      <Content>
        <List/>
      </Content>
    </Container>
  );
}
