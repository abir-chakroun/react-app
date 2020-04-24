import React, { Component } from "react";
import axios from 'axios';
import {Button} from 'react-bootstrap';

class ProductItem extends Component{
constructor(props){
  super(props);
  this._isMounted = false;
}

AddToCart = async (add_product) => {
  this.CancelTokenSource= axios.CancelToken.source;
  try{
    const product={ id: add_product.id,
      title: add_product.title,
      imagePath: add_product.imagePath,
      price: add_product.price.toString(),
      description: add_product.description
     }
  const res = await axios.post('http://localhost:3000/cart/',product, {cancelToken: this.CancelTokenSource.token})
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

componentDidMount() {
  this._isMounted = true;
  this._isMounted && this.AddToCart();
}

componentWillUnmount() {
  this._isMounted = false;
}

    render() {  

    return(
            <div className="col-lg-4 d-flex align-items-stretch">
                <div className="card">
                <div className="embed-responsive embed-responsive-16by9">
                    <img className="card-img-top embed-responsive-item" src={this.props.product.imagePath} alt="productImage"/>
                </div>
                    <div className="caption">
                        <h3>{this.props.product.title}</h3>
                        <p className="description">{this.props.product.description}</p>
                        <div className="card-img-bottom">
                            <div className="price float-left" ><strong> {this.props.product.price} DT </strong> </div>
                            <Button  onClick={() => { this.AddToCart(this.props.product) }} className="btn btn-success float-right" role="button">Add To Cart</Button>
                        </div>
                    </div>
              </div>        
           </div>
             
    )
}
}


export default ProductItem