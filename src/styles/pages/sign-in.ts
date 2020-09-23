import styled, { keyframes } from 'styled-components'

import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700%;
`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-500px);
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
    padding: 10px;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #a0aec0;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#A0AEC0')};
      }
    }
  }

  > a {
    color: #ed8936;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    outline: 0;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ED8936')};
    }
  }

  button {
    background: #ed8936;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ED8936')};
    }
  }
`

export const Background = styled.div`
  margin-top: 80px;
  max-width: 1080px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

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
