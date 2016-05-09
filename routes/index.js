var express = require('express');
var router = express.Router();
var Quiz = require('../models/user');
//var style=require('../public/stylesheets/style.css');
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
                
                res.render('index', {
                    user: req.user,
                    values: values
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
    router.get('/quiz/:id', function(req, res) {
        
       Quiz.Quiz.find({}, function(err, values) {
            if (err) {
                console.log('Error in getting value from database: ' + err);
                return (err);
            } else {
                
                res.render('quiz', {
                    user: req.user,
                    values: values,
                    quizname:req.params.id
                });
            }
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
    function quizdata(page,req,res){
    	
    }
}