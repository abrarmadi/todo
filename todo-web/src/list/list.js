import React, {Component}from 'react';
import{Link} from 'react-router-dom';
import Container from './container';
import './list.css';

class List extends Component{
       constructor(props){
           super(props);
          this.state = {
              list:props.list
          }
       }

    render(){
     
        return(
           
        
   
     <li className="collection-item">
      <Link to {`/List1/${this.state.list.listId}`}>{this.state.list.title}</Link>
     </li>
  
  
            
        );
   
        
    }
    
    
    
    
}
export default List;