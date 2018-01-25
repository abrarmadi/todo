var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var Task = require('./model/task');
var User = require('./model/user');
var TodoList = require('./model/todoList');

app.listen(3000,function(){
 console.log("todo API running on port 3000");   
});
app.use(session({secret:"toencryptthesession", resave:false,saveUninitialized:true}))
var db = mongoose.connect('mongodb://localhost/todo-list');




// register a new user
  app.post('/register',function(request,response){
    
   var user = new User();
     user.username  = request.body.username;
     user.firstName = request.body.firstName;
     user.lastName  = request.body.lastName;
     user.password  = request.body.password;
    
      if( user.username != null && user.password != null){
      
    user.save(function(err,savedUser) {
        if(err){
                response.status(500).send({error:"couldn't register a new user , please choose a nother username"});
            }
    
        
        else{
            response.status(200).send(savedUser);
        }
        
    }); 
      
  }
      
      
      else{    response.send("please enter a username and password")}
});




// user-login
app.post('/login',function(request,response){
    
   if(request.body.username != null && request.body.password != null) 
   {
     User.findOne({username : request.body.username , password :request.body.password }, function(rss,user){
         if(rss){
             response.status(500).send({error:"couldn't log in"});
         }
         
         if(!user)
             {
                 response.status(404).send({error:"user not found, please register first"});
                 
             }
         
         else
             {    request.session.user = user;//start a session for the user
                 response.status(200).send(user);
             }
     }); 
    
    
   }
  else
    { response.send("please enter your username and password") }
    
        });




//user-logout

app.get('/logout',function(request,response){
 request.session.destroy();
    response.status(200).send("user logged out");
    
});





//create to do list
app.put('/list/add',function(request,response){
    if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
    var todo = new TodoList();
    todo.title = request.body.title;
     todo.user = request.body.userId ;
    todo.save(function(err, newList){
      if(err){
                response.status(500).send("couldn't create a new list");
            }
        
      else{
            

             User.findOne({_id:request.body.userId}, function(err,user){
            if(err)
                { response.status(500).send({error:"couldn't find the user"}); }
            else {
                  User.update({_id:request.body.userId},{$addToSet:{todoList:newList._id}},function(err,st){

                 if(err){response.status(500).send({error:"couldn't add a list"}) }
                 else{response.status(200).send(newList);}

                                                        });
                 }
            }); 
        }
        
    });// end of the save function
    }
    });// end of put




// create a new task
app.put('/task/add',function(request,response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
    var tsk = new Task();
     tsk.title = request.body.title;
    
 if(request.body.title != null && request.body.title != "" )
 {   tsk.todo = request.body.todoId ;
     tsk.save(function(err, newTask){
      if(err){
                response.status(500).send("couldn't create a new task");}
        
      else{
            

     TodoList.findOne({_id:request.body.todoId}, function(err,todoList){
        if(err)
            { response.status(500).send({error:"couldn't find the list"}); }
        else {
                
              TodoList.update({_id:request.body.todoId},{$addToSet:{task:newTask._id}},function(err,st){
                
             if(err){ 
                 response.status(500).send({error:"couldn't add a task"}) }
                   else{
                       response.status(200).send(newTask);}

                                               });
           }

        });    
     }
        
    });// end of the save function
}
    
    
else
{response.send("please enter your task");}
    }
    });// end of put

 

// show the to-do lists for the user
app.get('/list/:userId',function(request, response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
    User.findOne({_id:request.params.userId}).populate({path:'todoList', model:'TodoList'}).exec( function(err,user){
     
     if(err){response.status(500).send({error:"couldn't find the user to show the lists"}); }
     else{
         var listT =[];
         for(var x  = 0 ; x< user.todoList.length; x++)
             {
                 listT.push(user.todoList[x].title);
                 
             }
         response.status(200).send( listT);
  
       
    
        }
     });
    }
 });
    
 

// show the tasks of a list
app.get('/task/:todoListId',function(request, response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
       
    TodoList.findOne({_id:request.params.todoListId}).populate({path:'task', model:'Task'}).exec( function(err,todo){
     
     if(err){response.status(500).send({error:"couldn't find the list to show the tasks"}); }
     else{
         var listT =[];
         for(var x  = 0 ; x< todo.task.length ; x++)
             {
                 listT.push(todo.task[x]);
                 
             }
         response.status(200).send( listT);
  
        }
     });
    }
 });


//edit the title of a task
app.put('/task/edit',function(request,response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else
      {
    Task.findOne({_id:request.body.taskId ,todo:request.body.listId },function(rss,task){
         if(rss)
            {
                response.status(500).send({error:"couldn't find the task"});
            }
        
        else
            {
                
              Task.update({_id:request.body.taskId},{$set:{title:request.body.nTitle}}, function(err,t){
                  
            if(err)
            {
                response.status(500).send({error:"couldn't update"});
            }
             else
                 {
                     response.status(200).send(t);
                 }
                  
                  
              }) ; 
                
            }
        
    });
    
}
});


//edit the title of a list
app.put('/list/edit',function(request,response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else
      {
    TodoList.findOne({_id:request.body.listId ,user:request.body.userId },function(err,list){
         if(err)
            {
                response.status(500).send({error:"couldn't find the list"});
            }
        
        else
            {
                
              TodoList.update({_id:request.body.listId},{$set:{title:request.body.nTitle}}, function(err,t){
                  
            if(err)
            {
                response.status(500).send({error:"couldn't update"});
            }
             else
                 {
                     response.status(200).send(t);
                 }
                  
                  
              }) ; 
                
            }
        
    });
    
}
});




//delete todo list

app.delete('/list/delete',function(request,response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
    TodoList.findOne({_id:request.body.listId , user:request.body.userId }, function(err,l){
     
        
        if(err)
            {
                response.status(500).send({error:"couldn't find the list"});
            }
        
        else
            {
                         TodoList.deleteOne({_id: request.body.listId}, function(err,delT){
                    
                    if(err){response.status(500).send({error:"couldn't delete the list"});}
                    
                    else
                        {
                         User.update({_id:request.body.userId},{$pull:{todoList:request.body.listId}},function(err,delList){
              
              if(err)
              {
                response.status(500).send({error:"couldn't delete the list"});
              }
              else
                  {
                     response.status(200).send(" the list has been deleted");  
                  }
              
              
          } );       
                        
                    }     
                });    
                    
            }
    });
    
    }
});



//test
app.delete('/l/delete',function(request,response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
    TodoList.findOne({_id:request.body.listId , user:request.body.userId}, function(err,l){
        
        
        if(err)
            {
                response.status(500).send({error:"couldn't find the list"});
            }
        
        else
            {         
                
                 console.log(l.task.length);
                    if(l.task.length != 0)
                        {
                            response.send("WARNING!!couldn't find the list, there are tasks inside the list");
                        }
                else
                       { TodoList.deleteOne({_id: request.body.listId}, function(err,delT){
                    
                    if(err){response.status(500).send({error:"couldn't delete the list"});}
                    
                    else
                        {
                         User.update({_id:request.body.userId},{$pull:{todoList:request.body.listId}},function(err,delList){
              
                       if(err)
                      {
                        response.status(500).send({error:"couldn't delete the list"});
                      }
                      else
                          {
                             response.status(200).send(" the list has been deleted");  
                          }


                        } );       
                        
                    }     
                });  
            }
            }
    });
    
    }
});














 // delete a task
app.delete('/task/delete',function(request,response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
    Task.findOne({_id: request.body.taskId , todo:request.body.listId},function(err,task){
        
        if(err)
            {
                response.status(500).send({error:"couldn't find the task"});
            }
        
        else
            {
                Task.deleteOne({_id: request.body.taskId , todo:request.body.listId}, function(err,delT){
                    
                    if(err){response.status(500).send({error:"couldn't delete the task"});}
                    
                    else
                        {
                            
                         TodoList.update({_id:request.body.listId},{$pull:{task:request.body.taskId}},function(err,delTask){

                     if(err)
                       {
                        response.status(500).send({error:"couldn't delete the task"});
                      }
                    else
                      {
                         response.status(200).send(" the task has been deleted");  
                      }


                       } );

                        }
                
                }); 
            }
    });
    
    }
});

//show the completed tasks
app.get('/task/completed/:todoListId',function(request, response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else{
    TodoList.findOne({_id:request.params.todoListId}).populate({path:'task', model:'Task'}).exec( function(err,todo){
     
     if(err){response.status(500).send({error:"couldn't find the list to show the tasks"}); }
     else{
         var listT =[];
         for(var x  = 0 ; x< todo.task.length ; x++)
             {   
                 if(todo.task[x].completeness == true)
                { listT.push(todo.task[x]);}
                 
             }
         response.status(200).send( listT);
  
        }
     });
    }
 });
 
// change the state of completeness
app.put('/task/completed',function(request,response){
     if(!request.session.user)
        {
            response.status(401).send("log in first or create an account if you are a new user");
        }
    else
      {
    Task.findOne({_id:request.body.taskId ,todo:request.body.listId },function(err,task){
         if(err)
            {
                response.status(500).send({error:"couldn't find the task"});
            }
        
        else
            {
                
              Task.update({_id:request.body.taskId},{$set:{completeness:request.body.state}}, function(err,t){
                  
            if(err)
            {
                response.status(500).send({error:"couldn't update"});
            }
             else
                 {
                     response.status(200).send(t);
                 }
                  
                  
              }) ; 
                
            }
        
    });
    
}
});





