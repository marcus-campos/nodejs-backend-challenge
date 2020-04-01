import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 16px;
  overflow-y: scroll;
`;

export const ListItem = styled.div`
  border: 1px solid #ebebeb;
  margin: 16px 0;
  height: 70px;
  display: flex;
  align-items: center;
`;

export const ColorIdentifier = styled.div`
  height: 100%;
  width: 4px;
  border-radius: 6px;
  background-color: ${(props) => props.color};
`;

export const Info = styled.div`
  display: flex;
  width: 100%;
  padding: 0 16px;
  justify-content: space-between;
`;

export const Name = styled.div`
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`;

export const ActionButtons = styled.div`
  svg{
    cursor: pointer;
  }
`;