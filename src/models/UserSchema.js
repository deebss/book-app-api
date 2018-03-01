var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);