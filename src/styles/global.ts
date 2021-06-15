import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    background: #fff;
    color: #000;
  }

  body, input, button {
    font: 18px 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  #root{
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }
`;
