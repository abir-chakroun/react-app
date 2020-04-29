import React, {Component} from 'react';
import { Button} from "react-bootstrap";
import CartItem from './CartItem'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

const CustomTableCell = withStyles(theme => ({
  root: {
    width: "25%"}
  })
  )(TableCell);


class Cart extends Component {

  constructor() {
    super();
    this.state={
      tot_qty:0, 
      tot_price:0,
      cart_products:[{_id:0, product:{}, qty:0}]
    }
    this._isMounted = false;
    this.getCart=this.getCart.bind(this);
    }

    getCart= async () => {         //get cart products from DB
      let totQty=0;  let totPrice=0; let result=[]; let i=0;
      this.CancelTokenSource= axios.CancelToken.source;
      try {
      const res= await axios.get('/cart',{cancelToken: this.CancelTokenSource.token}) 
        if(res.data){ 
              res.data.cart.map(elem => {
              result.push({_id:elem._id, 
              product:elem.product, 
              qty:elem.quantity})
              totQty+= elem.quantity;
              totPrice+= elem.quantity * elem.product.price;  
          })
          this._isMounted && this.setState({ tot_qty:totQty, tot_price:totPrice, cart_products:result});
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
   
  componentDidMount(prevProps) {
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

  if ( !this.state) {
    return (   <div> <h1> Your cart is empty ! </h1>  
    <Button variant='dark' href='/'> Shop Now </Button>
    </div>
    )
  }
    let listItems;
    listItems = this.state.cart_products.map( (order) =>{
    return (
      <CartItem  key={order._id} _id={order._id} order={order.product} qty={order.qty}/>
      
     ) })  
    
    return(
      <div >
      <h2 className="text-center"> Shopping Cart </h2>
      <Table className="fixed">
      <TableHead >
        <TableRow>
          <CustomTableCell >        </CustomTableCell>
          <CustomTableCell>Product </CustomTableCell>
          <CustomTableCell >Quantity</CustomTableCell>
          <CustomTableCell >Price   </CustomTableCell>
          <CustomTableCell >        </CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      {listItems}

      </TableBody>
      </Table>      
      </div>
    )
   
}
}


export default Cart;