var express = require('express');
var router = express.Router();
var Quiz = require('../models/user');
var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = function(passport) {

    router.get('/', function(req, res) {
        Quiz.Quiz.find({}, function(err, values) {
            console.log("in the quizdisplay");
            if (err) {
                console.log('Error in getting value from database: ' + err);
                return (err);
            } else {
                var user = {
                    user: req.user,
                    values: req.values
                };
                req.values = values;
                res.render('index', {
                    user: req.user,
                    values: req.values
                });
            }
        });

        console.log("in router file" + req.user);
    });

    router.get('/login', function(req, res) {
        console.log("getting d value from login.js");
        res.render('login', {
            message: req.flash('message')
        });
    });
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/signup', function(req, res) {
        res.render('register', {
            message: req.flash('message')
        });
    });

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.get('/home', isAuthenticated, function(req, res) {
        res.render('home', {
            user: req.user
        });
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}