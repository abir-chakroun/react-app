import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CartTotal extends Component {

    CalcTax(price){ 
        const TAX =0.04;
        return price*TAX}

     CalcNet(price){ 
        const TAX =0.04;
        return price + price*TAX}   

    render(){
    return(
    <React.Fragment>
    <div className='container'>
        <div className='row'>
            <div className='col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right'>
                <Link to="/cart">
                </Link>
                <h5>
                    <span className='text-title'> subtotal: </span>
                    <strong>{this.props.price} DT </strong>
                </h5>

                <h5>
                    <span className='text-title'> tax: </span>
                    <strong>{this.CalcTax(this.props.price)} DT </strong>
                </h5>

                <h5>
                    <span className='text-title'> total net: </span>
                    <strong>{this.CalcNet(this.props.price)} DT </strong>
                </h5>

                </div>
        </div>
    </div>
    </React.Fragment>
    )
}
}
export default CartTotal;
