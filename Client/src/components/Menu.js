import React, { Component } from "react";
import { Badge, NavDropdown, Nav } from 'react-bootstrap'
import { Form, Button,  FormControl} from "react-bootstrap";
import logo from '..//images/logo.png'
import Navbar from 'react-bootstrap/Navbar'
 class Menu extends Component{ 

 render(){
  return(
  <div>
    
    <Navbar bg="dark" variant="dark" expand="lg">
    <img alt="logo" src={logo} width="40" height="40" className="d-inline-block align-top" /> {' '}
    <Navbar.Brand href="/">Coffee Shop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/about"> About</Nav.Link>
      <Nav.Link href="/contact">Contact</Nav.Link>
      <Nav.Link >User</Nav.Link>
              <NavDropdown title="" id="basic-nav-dropdown"> 
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              </NavDropdown>
      <Nav.Link href="/cart"> Cart      
      <Badge pill variant="danger" className='badge'>{}</Badge>
    </Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
    </Navbar.Collapse>
    </Navbar>
</div>
    )
  }
}
 
export default Menu;
