import React, { useState, useEffect } from "react";
import api from "../../services/api";
import List from './List'
import { Container, Content } from "./styles";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const result = await api.get("/rooms");
      if (result.status === 200) {
        setRooms(result.data);
      }
    };
    fetchRooms();
  }, []);

  return (
    <Container>
      <Content>
        <List rooms={rooms}/>
      </Content>
    </Container>
  );
}
