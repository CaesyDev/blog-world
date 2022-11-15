const express = require('express');
const {create} = require('../controllers/user');
const {createRecord, update} = require('../controllers/blog');
const app = express();
const session = require('express-session');
const passport = require('passport');


//IMPORT PASSPORT LOCAL STRATEGY
require('../auth_strategies/local');


//IMPORT ROUTERS
const appRouter = require('./routers/app');


//APP SETTINGS
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 4000;


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret : "dfudgsgdgfhueruoehernjnrju3q4h3ndnnv34g743yy4y834mdn",
    saveUninitialized : false,
    resave : false,
}));
app.use(passport.initialize());
app.use(passport.session());


//USE ROUTERS
app.use(appRouter);


//SIGNUP FORM END POINT
app.post('/signup', create);


//LOGIN FORM END POINT
app.post('/login', passport.authenticate('local', { 
    successRedirect : '/dashboard',
    failureRedirect : '/login?error=bad credentials'
}));


//LOGOUT 
app.get('/logout', (req, res) => {

    req.logout((err) => {
        res.redirect('/login');
    });
});


//CREATE BLOG ROUTE
app.post('/createmyblog', createRecord);


//UPDATE BLOG ROUTE
app.post('/editblog', update);


app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`);
})