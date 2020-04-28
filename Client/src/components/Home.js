import React, {Component} from 'react';
import ControlledCarousel from "../components/ControlledCarousel";
import Products from '../components/Products';
import Menu from '../components/Menu';
import axios from 'axios';

class Home extends Component {

CancelToken = axios.CancelToken;
source = this.CancelToken.source();
abortController = new AbortController() /*instantiates a new AbortController and assigns the signal of that AbortController to this.signal */

constructor(){
    super();
    this._isMounted = false;

    this.state = {
      products: []    }
    this.getProducts=this.getProducts.bind(this);

  }

  getProducts= async () => {
    this.CancelTokenSource= axios.CancelToken.source;
    try{
    const res= await axios.get('http://localhost:3000/products',  {
      cancelToken: this.CancelTokenSource.token
    })
    this._isMounted && this.setState( {products: res.data.products})
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
    this._isMounted && this.getProducts();
  }

  componentWillUnmount() {
    this._isMounted = false;
 }


  render(){
    console.log(this.state);
    return (   
    <div>
    <ControlledCarousel />
    <Products products={this.state.products}/>
    </div>
  )

}
}

export default Home;