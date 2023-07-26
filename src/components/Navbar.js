import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const MyNavbar=()=>{
  return (
    <div>
         <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand><Link style={{textDecoration:"none", color:"white"}} to="/">Bookify</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link style={{textDecoration:"none", color:"rgb(207, 207, 207)"}} to="/" >Home</Link></Nav.Link>
            <Nav.Link><Link style={{textDecoration:"none", color:"rgb(207, 207, 207)"}} to="/book/list" >Add Listing</Link></Nav.Link>
            <Nav.Link><Link style={{textDecoration:"none", color:"rgb(207, 207, 207)"}} to="/books/orders" >Orders</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default MyNavbar
