import React, {Component ,memo} from 'react';
import CartItem from './CartItem'

import axios from 'axios';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartTotal from './CartTotal';

class Cart extends Component {

  constructor() {
    super();
    this.state={
      tot_price:0,
      cart_products:[]
    }
    this._isMounted = false;
    this.getCart=this.getCart.bind(this);
    }

    getCart= async () => {         //get cart products from DB
      let totPrice=0; let i=0; 
      this.CancelTokenSource= axios.CancelToken.source;
      try {
      const res= await axios.get('http://localhost:3000/cart',{cancelToken: this.CancelTokenSource.token}) 
        if(res.data){ 
              for( i=0; i<res.data.cart.length; i++){
                    totPrice+= res.data.cart[i].quantity * res.data.cart[i].product.price;  
              }
            this._isMounted && this.setState({cart_products:res.data.cart, tot_price:totPrice});         
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
 

 deleteCart = async () => {
  this.CancelTokenSource= axios.CancelToken.source;
  try {
  const res= await axios.delete('http://localhost:3000/cart',{cancelToken: this.CancelTokenSource.token}) 
  console.log(res);  
  if(res.data){ 
        this._isMounted && this.setState({cart_products:[], tot_price:0});         
      }
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

//  componentDidUpdate(){
//   this._isMounted = true;
//   this._isMounted && this.getCart();
//  }


render(){

  if ( this.state.cart_products.length>0) {
    let listItems;
    listItems = this.state.cart_products.map( (order) =>{
        return (
          <CartItem  key={order._id} _id={order._id} order={order.product} qty={order.quantity}/>
        ) })
        return(
          <div >
          <h2 className="col-10 mx-auto text-center text-title mb-5 mt-2"> Your Cart </h2>
          <CartColumns />
          {listItems}
          <CartTotal  price={this.state.tot_price} deleteCart={this.deleteCart} />
       
          </div>
        )

        }
        else{
          return ( <EmptyCart  />)
        }



   
}
}


export default memo(Cart);