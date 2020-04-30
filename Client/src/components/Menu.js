import React, { Component } from "react";
import { Badge, NavDropdown, Nav } from 'react-bootstrap'
import { Form, Button,  FormControl} from "react-bootstrap";
import logo from '..//images/logo.png'
import {Link} from 'react-router-dom';
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
      <Nav.Item> <Link to="/about"> About </Link> </Nav.Item>
      <Nav.Item> <Link to="/contact">Contact </Link> </Nav.Item>
      <Nav.Item >User </Nav.Item>
              <NavDropdown title="" id="basic-nav-dropdown"> 
              <NavDropdown.Item > <Link to="/register"> Register </Link> </NavDropdown.Item>
              <NavDropdown.Item><Link to="/login"> Login </Link></NavDropdown.Item>
              </NavDropdown>
      </Nav>
      <Nav.Item >
      <Link to="/cart"> <i className="fas fa-shopping-cart"></i>
      <Badge pill variant="danger" className='badge'>{}</Badge>
      </Link>
       </Nav.Item>
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
