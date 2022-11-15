const passport = require('passport');
const {Strategy} = require('passport-local');
const {validatePwd} = require('../utils/password');
const pool = require('../database/connection');


passport.use(

    new Strategy({
        usernameField : 'email',        
    }, (email, password, done) => {

        try {

            if(! email || !password){
                throw new Error('missing credentials');
            }

            pool.getConnection((err, connection) => {
                if(err) throw err;

                connection.query('SELECT * FROM users WHERE email=?', [email] , (err, rows) => {

                    if(rows.length === 0){
                        // throw new Error('User not found');
                        done(null, null);
                    }else{

                        const user = rows[0];
                        const passwordCheck = validatePwd(password, user.password);

                        if(passwordCheck){
                            done(null, user);
                        }else{
                            // throw new Error('Invalid password');
                            done(null, null);
                        }
                    }
                });

            });

        } catch (error) {
            done(error, null);
        }

    })
);


passport.serializeUser((user, done) => {
    done(null, user.userID);
});


passport.deserializeUser((userID, done) => {

    //find the user from id and attach to req.user obj
    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM users WHERE userID=?', [userID], (err, rows) => {

            const {userID, email, name} = rows[0];
            done(err, {userID, email, name}); // add userID, email, name to req.user object
        });
    });
});