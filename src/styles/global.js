import { createGlobalStyle } from 'styled-components';
import theme from './theme';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_950};
    color: ${({ theme }) => theme.COLORS.WHITE};
    -webkit-font-smoothing: antialiased;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &::-webkit-scrollbar {
    width: 8px; 
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.PINK};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:horizontal:hover {
    cursor: ew-resize;
  }

  &::-webkit-scrollbar-thumb:vertical:hover {
    cursor: n-resize;
  }

  body, input, button, textarea {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover {
    filter: brightness(0.9);
  }

  button.secondary:hover {
    filter: brightness(1.2);
  }
`;
