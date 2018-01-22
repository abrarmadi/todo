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
             {    request.session.user = user;
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
