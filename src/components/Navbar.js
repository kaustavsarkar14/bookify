import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { Button, Modal } from 'react-bootstrap';

const MyNavbar = () => {
  const firebase = useFirebase()
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = ()=>{
    firebase.handleSignOut()
    handleClose()
    navigate('/')
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to log out?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/" >Log out</Link>
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand><Link style={{ textDecoration: "none", color: "white" }} to="/">Bookify</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)" }} to="/" >Home</Link></Nav.Link>
            <Nav.Link><Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)" }} to="/book/list" >Add Listing</Link></Nav.Link>
            <Nav.Link><Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)" }} to="/books/orders" >Orders</Link></Nav.Link>
          </Nav>

          {firebase.isLoggedIn ?
            <Nav.Link onClick={handleShow} ><Link style={{ textDecoration: "none", color: "white" }} >Hi,{firebase.user.displayName ? firebase.user.displayName.split(" ")[0] : "user"}</Link></Nav.Link>
            :
            <>
              <Nav.Link><Link style={{ textDecoration: "none", color: "white" }} to="/login" >login</Link></Nav.Link>
              <Nav.Link><Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)", margin: "5px" }} >or</Link></Nav.Link>
              <Nav.Link><Link style={{ textDecoration: "none", color: "white" }} to="/register" >signup</Link></Nav.Link>
            </>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default MyNavbar
