import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.3s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Image = styled.img`
  max-width: 1080px; /* Máximo da largura da imagem */
  width: 100%;
  max-height: 100%; /* Máximo da altura da imagem */
  min-height: auto; /* Mínimo da altura, por padrão “auto” */
  background-size: 100%;
  background-repeat: no-repeat;
  padding-top: 20px;
  padding-right: 60px;
`

export const Background = styled.div`
  max-width: 1080px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const ImageCart = styled.img`
  animation: ${appearFromLeft} 1.5s;
  max-width: 1080px; /* Máximo da largura da imagem */
  width: 100%;
  max-height: 100%; /* Máximo da altura da imagem */
  min-height: auto; /* Mínimo da altura, por padrão “auto” */
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 20px;
`
