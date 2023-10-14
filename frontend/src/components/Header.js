import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../Images/Images Gallery.svg'; //'C:/Users/Chris/Desktop/images-gallery/frontend/src/Images/Images Gallery.svg';

const navbarStyle = {
  backgroundColor: '#eeeeee',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} data-bs-theme="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: '20rem', maxHeight: '4rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
