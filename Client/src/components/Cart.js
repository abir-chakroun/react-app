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

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state={tot_qty:0, tot_price:0,
    cart_products:[{_id:0, product:{}, qty:0}]
    }
    this._isMounted = false;
    this.getCart=this.getCart.bind(this);
    }

    getCart= async () => {//get cart products from DB
      this.CancelTokenSource= axios.CancelToken.source;
      try {
      let result=[];
      const res= await axios.get('https://coffe-react.herokuapp.com/cart/',{cancelToken: this.CancelTokenSource.token}
      ) 
        if(res.data){ 
          console.log(res.data);
          let tot_qty=0; let tot_price=0;
          for (let i=0;i<res.data.count;i++){
            result.push({_id:res.data.cart[i]._id, product:res.data.cart[i].product, qty:res.data.cart[i].quantity});
            tot_qty+= res.data.cart[i].quantity    
            tot_price+= res.data.cart[i].quantity * res.data.cart[i].product.price      
          } 
          this._isMounted && this.setState({ cart_products:result, tot_qty:tot_qty, tot_price:tot_price});
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
  console.log(this.state);

  if ( !this.state) {
    return (   <div> <h1> Your cart is empty ! </h1>  
    <Button variant='dark' href='/'> Shop Now </Button>
    </div>
    )
  }
    let listItems;
    let tot_qty=this.statetot_qty;
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