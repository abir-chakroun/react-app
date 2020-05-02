import React, { Component } from "react";
import ProductItem from "./ProductItem.js";
class Products extends Component{
      
    
    render() {
        let products = this.props.products;
        console.log(products);
        let listItems;
        if(products){
            listItems = products.map( (current_product) =>{
            return (
            <ProductItem  key={current_product.id} product={current_product}  />  )
            })   
        }
        else{
            console.log("cannot find any products to display! empty props")
        }
        
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