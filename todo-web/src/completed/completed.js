import React, {Component}from 'react';
import './completed.css';

class Completed extends Component{
   
    render(){
        return(

 <div class="container" id="completed" >
    <label class="form-check-label completed">
        
    <input class="form-check-input check" type="checkbox"  checked="checked" value="">
   
      </input>
    {this.props.taskTitle}
      
     </label>
  
</div>
                
        
            
            
        );
   
        
    }
    
    
    
    
}
export default Completed;