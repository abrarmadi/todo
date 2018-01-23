var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task = new Schema({
    
    title: String,
    completeness: {type:Boolean , default:false},
    expiryDate: Date
    
    
});

module.exports = mongoose.model('Task',task);