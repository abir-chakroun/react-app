import React, { Component } from "react";
import ProductItem from "./ProductItem.js";
import PropTypes from 'prop-types';
class Products extends Component{
    constructor(props) {
        super(props);
         }
      

    render() {
        let products = this.props.products;
        let listItems;
        if(products){
            listItems = products.map( (current_product) =>{
            return (
            <ProductItem  key={current_product.id} product={current_product}  />  )
            })   
        }
        console.log(this.props);
        return(

        <div className="container" >
            <div className="row">
            {listItems}
            </div>
        </div>
        )
       
}

}

// Products.propTypes = {
//     products: React.PropTypes.array
//   }

export default Products;