var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var task = new Schema({

    title: String,
    completeness: {type:Boolean , default:false},
    todo:{type:ObjectId , ref:"TodoList"}


});

module.exports = mongoose.model('Task',task);
