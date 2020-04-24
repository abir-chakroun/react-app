import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);

    this.handleChangeEmail=this.handleChangeEmail.bind(this)
    this.handleChangePassword=this.handleChangePassword.bind(this)
    this.handleChangeEmail=this.handleChangeEmail.bind(this)
    this.onSubmit=this.onSubmit.bind(this)

    this.state = {
      email:'',
      password:''
    } }

    onSubmit(e) {
        e.preventDefault();
        
        const user= {email: this.state.email,
        password:this.state.password}

        console.log(user);

        axios.post('http://localhost:3000/user/signup',user)
        .then(res => console.log(res.data))

    }




    handleChangeEmail(event){
        this.setState({email: event.target.value})
    }
    handleChangePassword(event){
        this.setState({password: event.target.value})
    }
  
  render() {
      
    return (
    <div>
      <form onSubmit={this.onSubmit}>
                    <div >
                        <label>Email address</label>
                        <input type="email" placeholder="Enter email"  onChange = {this.handleChangeEmail}/>
                    </div>

                    <div >
                        <label >Password</label>c
                        <input type="password" placeholder="Password" onChange={this.handleChangePassword}/>
                    </div>
                        <input type="submit" className="btn btn-primary" value="Submit" />
    
    </form>       
    </div>
    );
  }
}


export default Register;