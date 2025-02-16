import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import magpie_stylish from '../assets/magpie_stylish.png';
import styles from '../styles/globals.module.css';
import { Link } from 'react-router';

function CostumNavbar() {

  const [expand, setExpand] = useState(false);

  // function som stänger navbar
  const handleCloseNav = () => {setExpand(false)};

  // lyssnar efter klick på länk i navbar
useEffect(() => {
  const handleOutsideClick = (event) => {
    if(expand && !event.target.closest(`.${styles.navbar}`)) {
      setExpand(false);
    } 
  };

  document.addEventListener('click', handleOutsideClick);
  return () => document.removeEventListener('click', handleOutsideClick);
}, [expand]);


  return (
    <Navbar 
    expand="lg" 
    className={`bg-body-tertiary ${styles.navbar}`} 
    expanded={expand}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
          alt="Bild på skata"
          src={magpie_stylish}
          style={{ maxHeight: '50px' }}
          className={styles.magpie}
          />
        </Navbar.Brand>
        <Navbar.Toggle 
        aria-controls='basic-navbar-nav' 
        onClick={() => setExpand(!expand)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles.navItems}>
          <Nav.Link as={Link} to="/" onClick={handleCloseNav}>Boka tid</Nav.Link>
          <Nav.Link as={Link} to="/About" onClick={handleCloseNav} >Om mig</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CostumNavbar;