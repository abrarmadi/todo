import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import Container from './container';


const Main = ()=>(
<main>
  <Switch>
    
    <Route exact path='/' component={Login} />
      
     <Route exact path='/register' component={Register} />
      
     <Route exact path='/content' component={Container} />
    
 </Switch>  
    
    
</main>


)
export default Main;