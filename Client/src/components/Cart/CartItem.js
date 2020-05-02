import React, {Component,memo} from 'react';
import axios from 'axios';

class CartItem extends Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      qty: this.props.qty,
      total_price:this.props.qty*this.props.order.price
    }
    this._isMounted = false;
  }

  removeFromCart = async (id) =>{
    
    this.CancelTokenSource= axios.CancelToken.source;
    try {
    const res= await axios.delete('http://localhost:3000/cart/'+id,
    {cancelToken: this.CancelTokenSource.token}
    ) 
      if(res.data){ 
        console.log(res.data.message);
        }
      else {console.log('cannot delete product from cart')}
    }
    catch(error){
      if(axios.isCancel(error)){
        console.log('Error', error.message)
      }
      if (error.response) 
        console.log(error.response);
      else if (error.request) 
          console.log(error.request);
      else {
        throw error;
      }
        }
    finally{
        this.CancelTokenSource =null
      } 
  }

  MinusQuantity = async (id) => {
    //update quantity from backend
    this.CancelTokenSource= axios.CancelToken.source;
    try {
    const val= {value: -1}
    if (this.state.qty===0){
      console.log("qty null")
          return null
    }
    else{
    console.log('updating qty...')
    const res= await axios.put('http://localhost:3000/cart/'+ id, val, {cancelToken: this.CancelTokenSource.token}) 
      if(res.data){ 
          console.log(res.data)
          let Updatedqty= this.state.qty-1
          this._isMounted && this.setState({qty: Updatedqty})
          console.log(this.state.qty)
        }
      else{console.log("found no response from BD")}
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

  AddQuantity = async (id) => {
    this.CancelTokenSource= axios.CancelToken.source;
    try {
    const val= {value: 1};
    const res= await axios.put('http://localhost:3000/cart/'+id,val,
    {cancelToken: this.CancelTokenSource.token}
    ) 
      if(res.data){ 
        console.log(res.data)
        let Updatedqty= this.state.qty+1;
        this._isMounted && this.setState({qty: Updatedqty});
        }
        console.log(this.state.qty)
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

  componentWillUnmount() {
    this._isMounted = false;
 }

//  componentDidUpdate(){
//   this._isMounted = true;
//   this._isMounted && (this.AddQuantity() || this.MinusQuantity());
//  }

  render(){
    console.log(this.props);
    if(this.props.order){
      return (   
        <div className='row my-2 text-capitalize text-center'> 
          
          <div className='col-10 mx-auto col-lg-2'>
            <img className='img-fluid ml-5' style={{ height: "5rem", width: "5rem", borderRadius: "3px" }}
                    alt='productImage' src={this.props.order.imagePath }/>    
          </div>

          <div className='col-10 mx-auto col-lg-2'>
          <span className='d-lg-none'>product: </span>
          {this.props.order.title}
          </div>

          <div className='col-10 mx-auto col-lg-2'>
          <span className='d-lg-none'>price: </span>
          {this.props.order.price}
          </div>

          <div className='col-10 mx-auto col-lg-2'>
            <div className='d-flex.justify-content-center' role="group">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default btn-black" onClick={() => this.MinusQuantity(this.props._id)}> - </button>
              </div>
              <div className="btn-group" role="group">
              <button type="button" className="btn btn-default btn-black"> {this.state.qty} </button>  
                </div>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default btn-black" onClick={() => this.AddQuantity(this.props._id)}> + </button>
              </div>
              </div>
          </div>

          <div className='col-10 mx-auto col-lg-2'>
            <div className='cart-icon' onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')){this.removeFromCart(this.props._id) }}}>
              <i className='fas fa-trash'/>
            </div>
          </div>


          <div className='col-10 mx-auto col-lg-2'>
          <span className='d-lg-none'> item total: </span>
          <strong >{this.state.total_price} DT </strong> 
          </div>

    </div>
        )
      }
      else{ console.log("empty props from Cart component")}
          }
}
export default memo(CartItem);



