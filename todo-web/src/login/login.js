import React, {Component}from 'react';
import './login.css';
import axios from'axios';
import {Link } from 'react-router-dom';
class Login extends Component{
    
  

    
    
    render(){
        return(  
   <div className="container signin-container">
<div className="row">
<div className="col"></div>

<div className="col-sm-8 col-md-8">

  <div className="card signin-card">
    <div className="card-block">

  <h3 className="signin-text">
Get Life
  <small className="text-muted h1">Under Control!</small>
</h3>

<form className="signin-form">
  <div className="form-group">

      <input type="text" className="form-control" id="usernameInput" placeholder="Username" ref="username"></input>
  </div>
  <div className="form-group">

      <input type="password" className="form-control" id="passwordInput" placeholder="Password" ref="password"></input>
     <button type="button"  >Sign In</button>

  </div>
    <Link to="/register" className="create-new-account">Create an account</Link>
</form>
    </div>

   
      
      
  </div>


</div>
<div className="col"></div>


</div>

 </div>
   
        );
   
        
    } 
    
}
export default Login;