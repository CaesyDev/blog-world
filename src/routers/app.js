const {Router} = require('express');
const router = Router();
const pool = require('../../database/connection');
const {resource, purge} = require('../../controllers/blog');



router.get('/', (req, res) => {

    pool.getConnection((err, connection) => {

        connection.query('SELECT * FROM blogs', (err, rows) => {

            connection.release();
            res.render('index', {blogs : rows});
        });
    });

});



router.get('/blog/:id', (req, res) => {

    pool.getConnection((err, connection) => {

        if(err) throw err;
        let id = req.params.id;

        connection.query('SELECT * FROM blogs WHERE id=?', [id] , (err, rows) => {

            connection.release();

            if(rows.length > 0){
                res.render('blog', {title : rows[0].title, content : rows[0].content});
            }else{
                res.render('404');
            }
            
        });
    });
})



router.get('/signup', (req, res) => {

    res.render('signup');
})


router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/dashboard', (req, res) => {

    if(req.user){
        const userID = req.user.userID;

        pool.getConnection((err, connection) => {

            connection.query('SELECT * FROM blogs WHERE creatorID=?', [userID], (err, rows) => {

                connection.release();
                res.render('dashboard', {blogs : rows, name : req.user.name});
            })
        }); 

        
    }else{
        res.redirect('/login');
    }
});


router.get('/create-blog', (req, res) => {

    if(req.user){

        res.render('createblog');
    }else{
        res.redirect('/login');
    }
});


router.get('/edit/:id', (req, res) => {

    if(req.user){

        let userID = req.user.userID;
        let id = req.params.id;

        pool.getConnection((err, connection) => {

            connection.query('SELECT * FROM blogs WHERE creatorID=? and id=?', [userID, id], (err, rows) => {

                connection.release();
                res.render('editblog', {title : rows[0].title, content : rows[0].content, id : id});
            })
        }); 

    }else{
        res.redirect('/login');
    }
});



router.get('/myblog/:id' , resource);

router.get('/delete/:id', purge);




module.exports = router;