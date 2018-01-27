import React, {Component} from 'react';
import List from '../list/list';
import axios from 'axios';
import Header2 from './header2/header2';

class List1 extends Component {
    
     
    constructor(){
        super();
        this.state = {lists:[]}
    }
    
    componentWillMount(){
        this.getLists();
        
    }
    getLists(){
        let userId = this.props.match.params.id;
        axios.get(`http://localhost:3000/list/${userId}`).then(response=>{
            
           this.setState({lists:response.data},()=>{
                 
           })
            
        })
    }
   
  render() {
      
      
          const listItems = this.state.Lists.map((list,i)=>{
          
          return(
           
          <list key={list._id}  list = {list}></list>
          )
           
      })
    return (
      <div className="container-fluid">
     <div className="col"></div>
    <div className="col-sm-12 col-md-6" id="list">
            <div class="row">
                    <div className="col-sm-12 col-md-2 offset-md-1" >
                      <Header2/>
                    </div>
                
                
                </div>
               
                
                {listItems}
           
           </div>
              
              <div className="col"></div>
            
            
            
            
            
      
      </div>
    );
  }
}

export default List1;
