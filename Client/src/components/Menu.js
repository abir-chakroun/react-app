import React, { Component } from "react";
import { Badge, NavDropdown, Nav } from 'react-bootstrap'
import { Form, Button,  FormControl} from "react-bootstrap";
import logo from '..//images/logo.png'
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar'
 class Menu extends Component{ 

  constructor() {
    super();
    this.state=
    {tot_qty:0,
    }
    this._isMounted = false;
    this.getCart=this.getCart.bind(this);
    }

    getCart= async () => {//get cart products from DB
      this.CancelTokenSource= axios.CancelToken.source;
      try {
      let result=[];
      const res= await axios.get('http://localhost:3000/cart/all',{cancelToken: this.CancelTokenSource.token}
      ) 
        if(res.data){ 
          let tot_qty=0;
          for (let i=0;i<res.data.count;i++){
            tot_qty+= res.data.cart[i].quantity          
          } 
          this._isMounted && this.setState({ tot_qty:tot_qty});
          console.log(this.state);
          }
        else {console.log('empty cart')}
      }
      catch(error){
        if(axios.isCancel(error)){
          console.log('Error', error.message)
        }
        if (error.response) 
          console.log(error.response.data);
        else if (error.request) 
            console.log(error.request.data);
        else {
          throw error;
        }
          }
      finally{
          this.CancelTokenSource =null
        }

    } 
   
  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getCart();
  }

  componentWillUnmount() {
    this._isMounted = false;
 }

 componentDidUpdate(){
  this._isMounted = true;
  this._isMounted && this.getCart();
 }

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
      <Nav.Link href="/cart" onClick={this.getCart} > Cart      
      <Badge pill variant="danger" className='badge'>{this.state.tot_qty}</Badge>
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
