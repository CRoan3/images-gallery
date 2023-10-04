import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = ( { title } ) => {
    return (
        <Navbar bg="light" data-bs-theme="light">
          <Navbar.Brand href="/">{title}</Navbar.Brand>
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
