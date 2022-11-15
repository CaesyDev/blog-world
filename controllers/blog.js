const pool = require('../database/connection');



 function index(req, res){

    pool.getConnection((err, connection) => {

        if(err) throw err;
        console.log(connection.threadId);

        connection.query('SELECT * FROM blogs', (err, rows) => {
            
            connection.release();
            res.send(rows);
        });
    });
}


function resource(req, res){

   if(req.user){
    pool.getConnection((err, connection) => {

            if(err) throw err;
            let id = req.params.id;
            let userID = req.user.userID;

            connection.query('SELECT * FROM blogs WHERE id=? and creatorID=?', [id, userID] , (err, rows) => {

                connection.release();
                res.render('myblog', {title : rows[0].title, content : rows[0].content, id : rows[0].id});
            });
        });
   }else{
        res.redirect('/login');
   }
}


function createRecord(req, res) {

    if(req.user){
        const {title, content} = req.body;
        if(!title || !content){

            res.redirect('/create-blog?error=empty fields');
        }else{

            let uid = req.user.userID;
            pool.getConnection((err, connection) => {
                if(err) throw err;
                connection.query('INSERT INTO blogs (title, content, creatorID) VALUES (?,?,?)', [title, content, uid], (err, rows) => {
                    
                    if(rows.affectedRows > 0){
        
                        connection.release();
                        res.redirect('/dashboard');
                    }
                })
            })
        }
    }else{
        res.redirect('/login');
    }
   
}



function update(req, res){

    if(req.user){
        const {title, content, id} = req.body;

        if(!title || !content){

            res.redirect('/edit/'+id);
        }else{

            pool.getConnection((err, connection) => {

                if(err) throw err;
        
                connection.query('UPDATE blogs SET title=?, content=? WHERE id=?', [title, content, id], (err, rows) => {
        
                    if(err) throw err;
                    connection.release();
                    res.redirect('/myblog/'+id);
                });
            })
        }

       
    }else{
        res.redirect('/login');
    }
}


function purge(req, res){

   if(req.user){
    pool.getConnection((err, connection) => {

        if(err) throw err;
        let id = req.params.id;
        let userID = req.user.userID;

        connection.query('DELETE FROM blogs WHERE id=? and creatorID=?', [id, userID], (err, rows) => {

            if(err) throw err;
            connection.release();
            res.redirect('/dashboard');
        });
    });
   }else{
        res.redirect('/login');
   }
}


module.exports = {
    index, resource, createRecord, purge, update,
}