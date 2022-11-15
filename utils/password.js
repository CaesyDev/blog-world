const bcrypt = require('bcryptjs');

function hashPwd(password){

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}


function validatePwd(password, hash){

    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPwd, validatePwd,
}