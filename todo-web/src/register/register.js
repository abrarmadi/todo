import React, {Component}from 'react';

import axios from'axios';

import './register.css';
class Register extends Component{
   
    signup(user){
        axios.request({
         method:'post',
            ur:'http://localhost:3000/register',
            data: user
        }).then(response=>{
            
               this.setState({user:response.data},()=>{
                 
           })
           
             this.props.history.push('/');
        })
        
        
    }
  onClick(e){
      const user ={
          username:this.refs.username.value,
          email: this.refs.username.value,
          password:this.refs.password.value
          
      }
   
      
      this.signup(user);
      e.preventDefault();
  }
   
    render(){
        return(  
            <div className="container signin-container">
<div className="row">
<div className="col"></div>

<div className="col-sm-8 col-md-8">

  <div className="card signin-card">
    <div className="card-block">


<form className="signin-form">
  <div className="form-group">

      <input type="text" className="form-control" id="usernameInput" placeholder="Username" ref="username"></input>
  </div>
     <div className="form-group">

      <input type="email" className="form-control" id="emailInput" placeholder="Email" ref="email"></input>
  </div>
  <div className="form-group">

      <input type="password" className="form-control" id="passwordInput" placeholder="Password" ref="password"></input>
      
   

  </div>

</form>
          <button type="button" onClick={this.onClick.bind(this)}>Sign Up</button>
    </div>

   
      
      
  </div>


</div>
<div className="col"></div>


</div>

 </div>
   
        );
   
        
    } 
    
}
export default Register;