const pool = require('../database/connection');
const {hashPwd, validatePwd} = require('../utils/password');



function create(req, res) {

    let {name, email, password, confirm_password} = req.body;

    if(!name || !email || !password || !confirm_password){

        res.redirect('/signup?error=invalid form');
    }else{

        if(password !== confirm_password){
            res.redirect('/signup?error=password mismatch');
        }else{

            let uid = "uid_" + generateRandomString(10);
            
                password = hashPwd(password);
                pool.getConnection((err, connection) => {
                    if(err) throw err;

                    //check for existing emailAddress
                    connection.query('SELECT * FROM users WHERE email=?', [email], (err, rows) => {

                        if(rows.length > 0){
                            connection.release();
                            res.redirect('/signup?error=email already exist');
                        }else{

                            connection.query('INSERT INTO users (name, email, password, userID) VALUES (?,?,?,?)', [name, email, password, uid], (err, rows) => {
                        
                                if(rows.affectedRows > 0){
        
                                    connection.release();
                                    res.redirect('/login');
                                }
                            })
                        }
                    })
            })
        }
    }
}





function generateRandomString(length = 10) {

    let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    let randomString = '';

    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength ));
    }
    return randomString;
}

module.exports = {
    create,
}