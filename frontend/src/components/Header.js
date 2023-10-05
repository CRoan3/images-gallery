import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const navbarStyle = {
  backgroundColor: 'lightblue'  //camelCase notation is important
};

const Header = ( { title } ) => {
    return (
        <Navbar style={navbarStyle} data-bs-theme="light">
          <Container>
          <Navbar.Brand href="/">{title}</Navbar.Brand>
          </Container>
        </Navbar>
    )
};

// const Header = ( props ) => {             #this is another way to write the above Header component/properties for title
//  const { title } = props;
//  return (
//      <Navbar bg="light" data-bs-theme="light">
//        <Navbar.Brand href="/">{title}</Navbar.Brand>
//     </Navbar>
//  )
// };

export default Header;
