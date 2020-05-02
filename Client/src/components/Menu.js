import React, { Component } from "react";
import { Badge, NavDropdown, Nav } from 'react-bootstrap'
import { Form, Button,  FormControl} from "react-bootstrap";
// import logo from '../images/logo'
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
 class Menu extends Component{ 

 render(){
  return(
  <div>
    
    <Navbar bg="dark" variant="dark" expand="lg">
    {/* <img alt="logo" src={logo} width="40" height="40" className="d-inline-block align-top" /> {' '} */}
    <Navbar.Brand href="/">Coffee Shop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
       <Link to="/contact"> <i className="fa fa-phone" aria-hidden="true"></i>       </Link>
    </Nav>  

      <Link to="/cart"><Button float='left' className='btn-shop'><i className="fas fa-shopping-cart"></i> Cart </Button> </Link>
      <Badge pill variant="danger" className='badge'>{}</Badge>
    </Navbar.Collapse>
    </Navbar>
</div>
    )
  }
}
 
export default Menu;
