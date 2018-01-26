import React, {Component}from 'react';
import './login.css';
class Login extends Component{
    
    render(){
        return(  
            <div className="container signin-container">
<div className="row">
<div className="col"></div>

<div className="col-sm-12 col-md-10">

  <div className="card signin-card">
    <div className="card-block">

  <h3 className="signin-text">
Get Life
  <small className="text-muted h1">Under Control!</small>
</h3>


<form className="signin-form">
  <div className="form-group">

      <input type="text" className="form-control" id="usernameInput" placeholder="Username"></input>
  </div>
  <div className="form-group">

      <input type="password" className="form-control" id="passwordInput" placeholder="Password"></input>
    <button type="button" className="btn signin-btn btn-lg">Sign In</button>

  </div>
    <a href="#" className="create-new-account">Create an account</a>
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