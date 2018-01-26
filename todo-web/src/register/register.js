import React, {Component}from 'react';
import './register.css';
class Register extends Component{
    
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

      <input type="text" className="form-control" id="usernameInput" placeholder="Username"></input>
  </div>
     <div className="form-group">

      <input type="email" className="form-control" id="emailInput" placeholder="Email"></input>
  </div>
  <div className="form-group">

      <input type="password" className="form-control" id="passwordInput" placeholder="Password"></input>
    <button type="button" className="btn signin-btn btn-lg">Sign Up</button>

  </div>
 
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
export default Register;