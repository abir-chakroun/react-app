import React, { Component } from "react";
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div >
        <h1 className='text'>{this.props.text}</h1>
        <button onClick={this.props.closePopup}> close </button>
        </div>
      </div>
    );
  }
}

class ProductItem extends Component{

constructor(props){
  super(props);
  this._isMounted = false;
  this.state = {
    showPopup: false
  };
}

togglePopup() {
  this.setState({
    showPopup: !this.state.showPopup
  });
}

AddToCart = async (add_product) => {
  this.CancelTokenSource= axios.CancelToken.source;
  try{
    const product={ 
      _id: add_product._id,
      title: add_product.title,
      imagePath: add_product.imagePath,
      price: add_product.price,
      description: add_product.description
     }
  const res = await axios.post('/cart/',product, 
  {cancelToken: this.CancelTokenSource.token})
      if(res.data) {
        console.log(res.data.message);
    }
      else {
          console.log("error connecting to the server! response is empty")
      }
  }
  catch(error){
    if(axios.isCancel(error)){
      console.log('Error', error.message)
    }
    else if (error.response) 
       console.log(error.response.data);
    else if (error.request) 
        console.log(error.request.data);
    else 
      console.log('Error', error.message);
}
finally{
  this.CancelTokenSource =null
}
}

InCart = async (id) => {
  this.CancelTokenSource= axios.CancelToken.source;
  try{
  const res = await axios.get('/cart', 
  {cancelToken: this.CancelTokenSource.token})
  if(res.data){
      for(let i=0; i<res.data.cart.length;i++){
         if(res.data.cart[i].product._id===id) 
          {return true;
          }
    }
    return false;
  }
      else {
          console.log("error connecting to the server! response is empty")
      }
  }
  catch(error){
    if(axios.isCancel(error)){
      console.log('Error', error.message)
    }
    else if (error.response) 
       console.log(error.response.data);
    else if (error.request) 
        console.log(error.request.data);
    else 
      console.log('Error', error.message);
}
finally{
  this.CancelTokenSource =null
}
}

componentWillUnmount() {
  this._isMounted = false;
}

    render() {  
      console.log(this.props)
    return(
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
            <div className="card">

            <div className="img-container p-2" >
                <img className="card-img-top" src={this.props.product.imagePath} alt="productImage"/>
            </div> 
                <div className="container">
                
                <button className='read-btn' onClick={this.togglePopup.bind(this)}>
                   Read more... </button>
                  {this.state.showPopup ? 
                  <Popup
                    text={this.props.product.description}
                    closePopup={this.togglePopup.bind(this)}
                  />
                  : null
                   }

                <button className='cart-btn'>
                     <i className='fas fa-cart-plus' align='right' onClick={() =>{this.AddToCart(this.props.product)}} />
                </button>
                </div>

            <div className="card-footer d-flex justify-content-between">
                    <p className="align-self-center mb-0" > 
                    {this.props.product.title}
                    </p>
                    <h5 className="text-blue font-italic mb-0">
                      {this.props.product.price}
                      <span className="mr-1"> DT </span>
                    </h5>
                
            </div>

            </div>
            </ProductWrapper>               
    )

}

}

export default ProductItem

const ProductWrapper = styled.div`

 .card-footer{
   background: transparent;
   border-top: transparent;
   transition:all 0.7s linear;
 }
  
 .img-container{
  overflow: hidden;
 }
 

 .cart-btn{
   bottom:0;right:0;
   padding:0.2rem 0.4rem;
   border:none;
   float:right;

 }
 
 .read-btn{
  bottom:0;left:0;
  padding:0.2rem 0.4rem;
  background: none;
  float:left;
  color:blue;
  border:none;
}
.popup {
  width: 100%;
  height: 100%;
  top: 20;
  left: 20;
  right: 0;
  bottom: 0;
  margin: auto;
}

.text{
  color: black;
  font-family: verdana;
  font-size: 80%;
}
 `;