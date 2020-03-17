import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body{
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: #f4f4f4;
    font-family: 'Roboto', sans-serif;
    color: black;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;