var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    author: String
}, {collection: 'books'});

module.exports = mongoose.model('Book', bookSchema);