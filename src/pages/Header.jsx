import React from 'react'
import styles from './header.module.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <header className={styles.header}>Scratch board 0.0.3
    
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to='/userScratches'><Navbar.Brand>Scratches</Navbar.Brand></Link>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Profile</Nav.Link>
            <Nav.Link as={Link} to='boards'>Boards</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </header>
    </>
  )
}

export default Header