var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var app = express();

var port = process.env.PORT || 5000;
var nav = [{
    link: '/books',
    text: 'Books'
},
{
    link: '/authors',
    text: 'Authors'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'SOME_SECRET_HERE'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello EJS',
        nav: [{
            link: '/books',
            text: 'Books'
        },
        {
            link: '/authors',
            text: 'Authors'
        }]
    });
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(port, function (err) {
    console.log(`Running server on port ${port}`);
});