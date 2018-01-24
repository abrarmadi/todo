var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var todoList = new Schema({
    
    title:{type:String , default:"To-Do"},
    task:[{type:ObjectId , ref:"Task"}],
    user : {type:ObjectId , ref:"User"}
    
    
});

module.exports = mongoose.model('TodoList',todoList);