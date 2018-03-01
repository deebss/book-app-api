var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
mongoose = require('mongoose');
var User = require('../../models/UserSchema');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'

    }, (username, password, done) => {

        mongoose.connect('YOUR_MONGO_URL', (err) => {
            User.findOne({username: username}, (err, results) => {
                if (results.password === password) {
                    var user = results;
                    done(null,  user);
                } else {
                    done(null, false, {message: 'Bad Password'});
                }
            });
        });
    }));
};

