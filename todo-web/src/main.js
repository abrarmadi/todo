import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import Container from './container';
import List1 from './list1/list1';

const Main = ()=>(
<main>
  <Switch>
    
    <Route exact path='/' component={Login} />
      
     <Route exact path='/register'component={Register} />
      
     <Route exact path='/content/:todoListId'component={Container} />
    
      <Route exact path='/lists/:userId' component={List1} />
    
 </Switch>  
    
    
</main>


)
export default Main;