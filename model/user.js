var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var user = new Schema({
    
    username: {type:String, unique:true , required : true },
    firstName: String ,
    lastName:  String ,
    password: {type: String , required:true  },
     task:[{type:ObjectId , ref:"Task"}]
    
    
});

module.exports = mongoose.model('User',user);