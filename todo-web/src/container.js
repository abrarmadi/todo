import React, { Component } from 'react';
import './container.css';
import {Link} from 'react-router-dom';
import Task from './task/task';
import Header from './header/header';
import Completed from './completed/completed';

import axios from 'axios';
let  todoListId;
class Container extends Component {
    
       
      
    constructor(){
        super();
        this.state ={tasks:[],
        completedTasks:[]}
       
    }
     componentWillMount(){
        this.getTasks();
         this.getCompleted();
      
    }
    
    
    getTasks(){
       todoListId = this.props.match.params.todoListId;
        axios.get(`http://localhost:3000/task/${todoListId}`).then(response=>{
            
           this.setState({tasks:response.data},()=>{
                 
           })
            
        })
        .catch(err=>console.log(err));
    }
    
    
    
    getCompleted(){
        todoListId  = this.props.match.params.todoListId;
        axios.get(`http://localhost:3000/task/completed/${todoListId}`).then(response=>{
            
           this.setState({completedTasks:response.data},()=>{
                 
           })
            
        })
        .catch(err=>console.log(err));
    } 
    
    

    
  
  render() {
      
      
          const TaskItems = this.state.Tasks.map((task,i)=>{
          
          return(
           
          <Task key={task._id}  task= {task} listId ={todoListId}></Task>
          )
           
      })  
          
          
          
             const CompletedItems = this.state.Tasks.map((completed,i)=>{
          
          return(
           
          <Completed key={completed._id}  completedTask= {completed}></Completed>
          )
           
      })  
          
          
          
      
   
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
                <Task/>
                
                </div>
            
           </div>
           <div className="col-sm-12 col-md-3 completed"> <Completed/></div>
            
           
            </div>
      
      </div>
    );
  }
}

export default Container;
