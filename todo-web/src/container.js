import React, { Component } from 'react';
import './container.css';

import Task from './task/task';
import Header from './header/header';
import Completed from './completed/completed';

import axios from 'axios';
class Container extends Component {
    
       
      
    constructor(){
        super();
        this.state ={tasks:[] }
       
    }
    
  
  render() {
   
    return (
      <div className=" container content">
            <br />
            <Link className="btn grey" to="/lists">Back</Link>
       <div className="row content2"  >
             <div className="col"></div>
            <div className="col-sm-12 col-md-6" id="task">
                <div class="row">
                    <div className="col-sm-12 col-md-6" >
                    
                      <Header/>
                   
                    
                    </div>
                
                
                </div>
            
           </div>
           <div className="col-sm-12 col-md-3 completed"> <Completed/></div>
            
           
            </div>
      
      </div>
    );
  }
}

export default Container;
