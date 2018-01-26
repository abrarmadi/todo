import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';


const Main = ()=>(
<main>
  <Switch>
    
    <Route exact path='/' component={Login} />
      
     <Route exact path='/register' component={Register} />
      
    
    
 </Switch>  
    
    
</main>


)
export default Main;