var express = require('express');
var authRouter = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/UserSchema');

var router = () => {
    authRouter.route('/signUp').post((req, res) => {

        mongoose.connect('YOUR_MONGO_URL', (err) => {

            User.collection.insert({
                username: req.body.userName,
                password: req.body.password
            }, (err, user) => {
                if (err) { console.error(err); }
                mongoose.disconnect();
                req.login(user.ops[0], () => {
                    res.redirect('/auth/profile');
                });
            });
        });
    });

    authRouter.route('/signIn').post(passport.authenticate('local', {
        failureRedirect: '/'
    }), (req, res) => {
        res.redirect('/auth/profile');
    });

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;