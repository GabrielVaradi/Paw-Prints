import React from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import dogman from './assets/canyondogfinal.jpg'

const Styles = styled.div`
  .jumbo {
    background: url(${dogman}) no-repeat fixed bottom;
    background-size: cover;
    color: #ccc;
    height: 20rem;
    position: relative;
    z-index: -2;
  }

  .overlay {    
    position: absolute;
    top: 0;
    left: 0;
    bottom: 25rem;
    right: 0;
    z-index: -1;
  }

`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
        <Container>
          <h2>Reuniting pets</h2>
          <h2>with their owners</h2>
        </Container>
    </Jumbo>
  </Styles>
)

