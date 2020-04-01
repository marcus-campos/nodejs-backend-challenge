import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 800px;
  height: 500px;
  padding: 0 16px 16px 16px;
  overflow-y: scroll;
`;

export const MessageBox = styled.div`
  display: flex;
  padding: 16px;
  background-color: #fafafa;
  margin: 16px;
`;

export const Author = styled.div`
  font-weight: bold;
  margin-right: 16px;
`;

export const Message = styled.div`
  display: flex;
`;

export const InputMessage = styled.div`
  width: 800px;
  margin-top: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;