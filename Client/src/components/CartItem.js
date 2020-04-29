import React, {Component} from 'react';
import { Button} from "react-bootstrap";
import '../App.css';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios';



class CartItem extends Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      qty: 0,
      total_price:0
    }
    this._isMounted = false;
  }

  removeFromCart = async (id) =>{
    this.CancelTokenSource= axios.CancelToken.source;
    try {
    const res= await axios.delete('/cart/'+id,
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
      const val= {value: -1};
      this.CancelTokenSource= axios.CancelToken.source;
    try {
    if (this.state.qty===0){
          return null
    }
    else{
    const res= await axios.put('/cart/'+id,val, {cancelToken: this.CancelTokenSource.token}) 
      if(res.data){ 
          let Updatedqty= this.state.qty -1
          this._isMounted && this.setState({qty: Updatedqty})
        }
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
      //update quantity from backend
    this.CancelTokenSource= axios.CancelToken.source;
    const val= {value: 1};
    try {
      if (this.state.qty===10){
        return null
  }
  else{
    const res= await axios.put('/cart/'+id,val,
    {cancelToken: this.CancelTokenSource.token}
    ) 
      if(res.data){ 
        let Updatedqty= this.state.qty+1;
        this._isMounted && this.setState({qty: Updatedqty});
        }
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

  componentWillUnmount() {
    this._isMounted = false;
 }

//  componentDidUpdate(){
//   this._isMounted = true;
//   this._isMounted && (this.removeFromCart() ||this.AddQuantity() || this.MinusQuantity()) ;
//  }

  render(){
    console.log(this.props)
    console.log(this.state)

    if(this.props.order){
      return (   
      <div>
        <TableRow>
        <TableCell >
        <Avatar style={{ height: "100px", width: "100px" }}
                src={this.props.order.imagePath }
      />    
        </TableCell>
        <TableCell style={{  width: "150px" }} ><h6 className="title text-truncate">{this.props.order.title} </h6></TableCell>
        <TableCell style={{  width: "100px" }}>
        <div class="btn-group btn-group-justified" role="group" aria-label="...">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default btn-danger" onClick={() => this.MinusQuantity(this.props._id)} >-</button>
        </div>
        <div class="btn-group" role="group">
        <button type="button" class="btn btn-default"> {this.props.qty} </button>  
          </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default btn-success" onClick={() => this.AddQuantity(this.props._id)}>+</button>
        </div>
      </div>
        </TableCell>
        <TableCell >	<var className="price">{this.props.order.price} </var> </TableCell>
        <TableCell > <Button className="btn btn-danger" onClick={() => this.removeFromCart(this.props._id)}> Remove </Button> </TableCell>
        </TableRow>
      </div> 
        )
      }
      else{ console.log("empty props from Cart component")}
          }
}
export default CartItem;