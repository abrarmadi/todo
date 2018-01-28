import React, {Component}from 'react';
import {Link} from 'react-router-dom';
import './task.css';

class Task extends Component{
      constructor(props){
           super(props);
          this.state = {
              task:props.task,
               list: props.listId
          }
       }
    
    
    
    
    
    
    
    render(){
        return(

 <div class="form-check" id="title">
    <label class="form-check-label ">
        
    <input class="form-check-input check" type="checkbox" value="">
   
      </input>
        {this.state.task.title}
      
     </label>
   <a href="#" ><img src="https://png.icons8.com/cotton/2x/edit.png"></img></a>
</div>
                
        
            
            
        );
   
        
    }
    
    
    
    
}
export default Task;