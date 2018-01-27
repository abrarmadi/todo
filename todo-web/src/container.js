import React, { Component } from 'react';
import './container.css';
import List from './list/list';
import Task from './task/task';
import Header from './header/header';
import Completed from './completed/completed';

class Container extends Component {
  render() {
    return (
      <div className=" container content">
       <div className="row content2"  >
            <div className="col-sm-12 col-md-2 offset-md-1" id="list">
           
           <List></List>
            <List></List>
                 <List></List>
           
           </div>
            <div className="col-sm-12 col-md-6" id="task">
                <div class="row">
                    <div className="col-sm-12 col-md-6" >
                    
                      <Header/>
                   
                    
                    </div>
                
                
                </div>
               <Task taskTitle="task1"/>
            <Task taskTitle="task1"/>
                 <Task taskTitle="task1"/>
           </div>
           <div className="col-sm-12 col-md-3 completed"> <Completed/></div>
            
           
            </div>
      
      </div>
    );
  }
}

export default Container;
