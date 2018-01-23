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
    
    user.save(function(err,savedUser)
             {
        if(err){
                response.status(500).send({error:"couldn't register a new user , please choose a nother username"});
            }
    
        
        else{
            response.status(200).send(savedUser);
        }
        
    }); 
});




// user-login

app.post('/login',function(request,response){
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
        });




//user-logout

app.get('/logout',function(request,response){
 request.session.destroy();
    response.status(200).send("user logged out");
    
});





//create to do list


app.put('/list/add',function(request,response){
    
    var todo = new TodoList();
    todo.title = request.body.title;
    
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
    
    });// end of put




// create a new task

app.put('/task/add',function(request,response){
    
    var tsk = new Task();
    tsk.title = request.body.title;
    
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
    
    });// end of put

 

// show the to-do lists for the user


app.get('/list/:userId',function(request, response){
    
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
    
 });
    
 

// show the tasks of a list


app.get('/task/:todoListId',function(request, response){
    
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
    
 });




