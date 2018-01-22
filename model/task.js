var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task = new Schema({
    
    title: String,
    completeness: Boolean,
    expiryDate: Date
    
    
});

module.exports = mongoose.model('Task',task);