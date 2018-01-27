import React, {Component}from 'react';
import './task.css';

class Task extends Component{
   
    render(){
        return(

 <div class="form-check" id="title">
    <label class="form-check-label ">
        
    <input class="form-check-input check" type="checkbox" value="">
   
      </input>
     {this.props.taskTitle}
      
     </label>
   <a href="#" ><img src="https://png.icons8.com/cotton/2x/edit.png"></img></a>
</div>
                
        
            
            
        );
   
        
    }
    
    
    
    
}
export default Task;