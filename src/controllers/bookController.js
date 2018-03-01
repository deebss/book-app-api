var mongoose = require('mongoose');
var bookModel = require('../models/BookSchema');

var bookController = function (bookService, nav) {

    var middleware = function (req, res, next) {
        // if (!req.user) {
        //     res.redirect('/');
        // }
        next();
    };

    var getIndex = function (req, res) {
        mongoose.connect('YOUR_MONGO_URL');
        bookModel.find((err, result) => {
            var books = [];
            for (var book of result) {
                books.push(book.toObject());
            }
            mongoose.disconnect();
            res.render('bookListView', {
                title: 'Hello EJS',
                nav: nav,
                books: books
            });
        });
    };

    var getById = function (req, res) {
        var id = req.params.id;
        mongoose.connect('YOUR_MONGO_URL');
        bookModel.findById(id, (err, result) => {
            mongoose.disconnect();
            let resObject = result.toObject();
            if (resObject.bookId) {
                bookService.getBookById(resObject.bookId, (err, book) => {
                    result.book = book;
                    res.render('bookView', {
                        title: 'Hello EJS',
                        nav: nav,
                        book: result
                    });
                });
            } else {
                res.render('bookView', {
                    title: 'Hello EJS',
                    nav: nav,
                    book: resObject
                });
            }
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;